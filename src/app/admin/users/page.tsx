
"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  UserPlus, 
  MoreVertical,
  Eye,
  ShieldAlert,
  UserCog,
  Loader2,
  Mail,
  Calendar,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useFirestore, useCollection } from "@/firebase";
import { collection, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const roleStyles: Record<string, string> = {
  admin: "bg-purple-100 text-purple-700 border-purple-200",
  teacher: "bg-blue-100 text-blue-700 border-blue-200",
  student: "bg-teal-100 text-teal-700 border-teal-200",
};

const statusStyles: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-700",
  suspended: "bg-rose-100 text-rose-700",
  pending: "bg-amber-100 text-amber-700",
};

export default function UsersManagementPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const usersQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'users'), orderBy('createdAt', 'desc'));
  }, [firestore]);

  const { data: users, loading } = useCollection(usersQuery);

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    const lowerSearch = searchTerm.toLowerCase();
    return users.filter(u => 
      u.displayName?.toLowerCase().includes(lowerSearch) || 
      u.email?.toLowerCase().includes(lowerSearch)
    );
  }, [users, searchTerm]);

  const handleDelete = async (userId: string) => {
    if (!firestore) return;
    if (!confirm("Are you sure you want to delete this user record? This action cannot be undone.")) return;

    const docRef = doc(firestore, 'users', userId);
    deleteDoc(docRef)
      .then(() => {
        toast({
          title: "Record Deleted",
          description: "The user record has been removed successfully.",
        });
      })
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: docRef.path,
          operation: 'delete',
        });
        errorEmitter.emit('permission-error', permissionError);
        toast({
          variant: "destructive",
          title: "Delete Failed",
          description: error.message || "Could not delete the user record.",
        });
      });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full max-w-md text-left">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input 
            placeholder="Search users..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-14 bg-white border-none rounded-2xl shadow-sm focus-visible:ring-blue-600"
          />
        </div>
        <Button asChild className="h-14 px-8 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 gap-2 text-base cursor-pointer border-none transition-all active:scale-95">
          <Link href="/admin/users/create">
            <UserPlus className="w-6 h-6" /> Add New User
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          <p className="font-bold">Syncing User Directory...</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-[32px] shadow-sm border border-dashed border-gray-200">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <UserCog className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">No Users Registered</h3>
          <p className="text-gray-500 mt-2 max-w-xs mx-auto">Create your first system user to start managing your academy faculty and staff.</p>
          <Button asChild variant="outline" className="mt-8 rounded-xl font-bold">
            <Link href="/admin/users/create">Add User Account</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="group border-none shadow-[0_10px_40px_rgba(0,0,0,0.04)] rounded-[24px] overflow-hidden bg-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500">
              <div className={cn(
                "h-1.5 w-full",
                user.role === 'admin' ? "bg-purple-500" : user.role === 'teacher' ? "bg-blue-500" : "bg-teal-500"
              )}></div>
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 rounded-2xl shadow-md border-2 border-white">
                      <AvatarImage src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} />
                      <AvatarFallback className="bg-gray-100 font-bold text-gray-400">
                        {user.displayName?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors line-clamp-1">
                        {user.displayName || "Unknown User"}
                      </h3>
                      <Badge variant="outline" className={cn("mt-1.5 px-2.5 py-0.5 rounded-lg font-black text-[9px] uppercase tracking-widest border shadow-none", roleStyles[user.role] || "bg-gray-100 text-gray-500")}>
                        {user.role}
                      </Badge>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:text-gray-600 rounded-lg">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44 rounded-xl shadow-xl border-gray-100 p-1">
                      <DropdownMenuItem asChild className="p-2.5 cursor-pointer hover:bg-gray-50 rounded-lg">
                        <Link href={`/admin/users/${user.id}`} className="flex items-center w-full">
                          <Eye className="mr-2 h-4 w-4 text-blue-500" />
                          <span className="font-bold text-xs text-gray-700">View Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="p-2.5 cursor-pointer hover:bg-gray-50 rounded-lg">
                        <Link href={`/admin/users/${user.id}?edit=true`} className="flex items-center w-full">
                          <UserCog className="mr-2 h-4 w-4 text-blue-600" />
                          <span className="font-bold text-xs text-gray-700">Edit Access</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-gray-50" />
                      <DropdownMenuItem 
                        onClick={() => handleDelete(user.id)}
                        className="p-2.5 cursor-pointer hover:bg-rose-50 text-rose-600 rounded-lg"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span className="font-bold text-xs">Delete Record</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-4 pt-6 border-t border-gray-50">
                  <div className="flex items-center gap-3 text-sm text-gray-500 font-medium text-left">
                    <Mail className="w-4 h-4 text-gray-300" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500 font-medium text-left">
                    <Calendar className="w-4 h-4 text-gray-300" />
                    <span>Joined {user.createdAt?.toDate ? new Date(user.createdAt.toDate()).toLocaleDateString() : 'Recently'}</span>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-2.5 h-2.5 rounded-full", user.status === 'active' ? "bg-emerald-500" : "bg-rose-500")}></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Status</span>
                  </div>
                  <Badge className={cn("px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border-none shadow-none", statusStyles[user.status] || "bg-gray-100 text-gray-500")}>
                    {user.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
