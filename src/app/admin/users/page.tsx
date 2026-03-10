
"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  UserPlus, 
  MoreVertical,
  Eye,
  UserCog,
  Loader2,
  Mail,
  Calendar,
  Trash2,
  User
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useFirestore, useCollection } from "@/firebase";
import { collection, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

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
      u.role !== 'teacher' && (
        u.displayName?.toLowerCase().includes(lowerSearch) || 
        u.email?.toLowerCase().includes(lowerSearch)
      )
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
            <UserPlus className="w-6 h-6" /> Add user
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          <p className="font-bold">Syncing Directory...</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-[32px] shadow-sm border border-dashed border-gray-200">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">No Users Found</h3>
          <p className="text-gray-500 mt-2 max-w-xs mx-auto">Account records will appear here once registered.</p>
          <Button asChild variant="outline" className="mt-8 rounded-xl font-bold">
            <Link href="/admin/users/create">Add User</Link>
          </Button>
        </div>
      ) : (
        <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden bg-white">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-gray-50/50">
                <TableRow className="hover:bg-transparent border-gray-100">
                  <TableHead className="px-8 py-5 text-xs font-black uppercase tracking-wider text-gray-400 text-left">user name</TableHead>
                  <TableHead className="px-8 py-5 text-xs font-black uppercase tracking-wider text-gray-400 text-left">Email</TableHead>
                  <TableHead className="px-8 py-5 text-xs font-black uppercase tracking-wider text-gray-400 text-left">Status</TableHead>
                  <TableHead className="px-8 py-5"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((u) => (
                  <TableRow key={u.id} className="border-gray-50 hover:bg-gray-50/50 transition-colors group">
                    <TableCell className="px-8 py-5">
                      <span className="font-bold text-gray-900">{u.displayName || "Unknown User"}</span>
                    </TableCell>
                    <TableCell className="px-8 py-5">
                      <span className="font-medium text-gray-500">{u.email}</span>
                    </TableCell>
                    <TableCell className="px-8 py-5 text-left">
                      <Badge className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border-none shadow-none",
                        u.status === 'active' ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"
                      )}>
                        {u.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-8 py-5 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50 rounded-lg">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44 rounded-xl shadow-xl border-gray-100 p-1">
                          <DropdownMenuItem asChild className="p-2.5 cursor-pointer hover:bg-gray-50 rounded-lg">
                            <Link href={`/admin/users/${u.id}`} className="flex items-center w-full">
                              <Eye className="mr-2 h-4 w-4 text-blue-500" />
                              <span className="font-bold text-xs text-gray-700">View Profile</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild className="p-2.5 cursor-pointer hover:bg-gray-50 rounded-lg">
                            <Link href={`/admin/users/${u.id}?edit=true`} className="flex items-center w-full">
                              <UserCog className="mr-2 h-4 w-4 text-blue-600" />
                              <span className="font-bold text-xs text-gray-700">Edit Access</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-gray-50" />
                          <DropdownMenuItem 
                            onClick={() => handleDelete(u.id)}
                            className="p-2.5 cursor-pointer hover:bg-rose-50 text-rose-600 rounded-lg"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span className="font-bold text-xs">Delete Record</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
