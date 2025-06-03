
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { User, UserPlus, Trash2, Edit } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';

interface AdminUser {
  id: string;
  email: string;
  role: 'admin';
  createdAt: string;
  lastLogin?: string;
}

interface AdminUserForm {
  email: string;
  password: string;
  confirmPassword: string;
}

const AdminUsersTab = () => {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);

  const createForm = useForm<AdminUserForm>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const editForm = useForm<Partial<AdminUserForm>>({
    defaultValues: {
      email: ''
    }
  });

  // Load admin users from localStorage
  useEffect(() => {
    const savedUsers = localStorage.getItem('adminUsers');
    if (savedUsers) {
      setAdminUsers(JSON.parse(savedUsers));
    } else {
      // Initialize with default admin user
      const defaultUser: AdminUser = {
        id: '1',
        email: 'admin@techcorp.com',
        role: 'admin',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
      setAdminUsers([defaultUser]);
      localStorage.setItem('adminUsers', JSON.stringify([defaultUser]));
    }
  }, []);

  const saveUsers = (users: AdminUser[]) => {
    setAdminUsers(users);
    localStorage.setItem('adminUsers', JSON.stringify(users));
  };

  const handleCreateUser = (data: AdminUserForm) => {
    if (data.password !== data.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    // Check if email already exists
    if (adminUsers.some(user => user.email === data.email)) {
      toast({
        title: "Error",
        description: "User with this email already exists",
        variant: "destructive"
      });
      return;
    }

    const newUser: AdminUser = {
      id: Date.now().toString(),
      email: data.email,
      role: 'admin',
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...adminUsers, newUser];
    saveUsers(updatedUsers);
    
    toast({
      title: "Success",
      description: "Admin user created successfully"
    });

    createForm.reset();
    setIsCreateDialogOpen(false);
  };

  const handleEditUser = (data: Partial<AdminUserForm>) => {
    if (!editingUser) return;

    // Check if email already exists (excluding current user)
    if (data.email && adminUsers.some(user => user.email === data.email && user.id !== editingUser.id)) {
      toast({
        title: "Error",
        description: "User with this email already exists",
        variant: "destructive"
      });
      return;
    }

    const updatedUsers = adminUsers.map(user => 
      user.id === editingUser.id 
        ? { ...user, email: data.email || user.email }
        : user
    );

    saveUsers(updatedUsers);
    
    toast({
      title: "Success",
      description: "Admin user updated successfully"
    });

    editForm.reset();
    setIsEditDialogOpen(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (userId: string) => {
    // Prevent deleting the last admin user
    if (adminUsers.length === 1) {
      toast({
        title: "Error",
        description: "Cannot delete the last admin user",
        variant: "destructive"
      });
      return;
    }

    const updatedUsers = adminUsers.filter(user => user.id !== userId);
    saveUsers(updatedUsers);
    
    toast({
      title: "Success",
      description: "Admin user deleted successfully"
    });
  };

  const openEditDialog = (user: AdminUser) => {
    setEditingUser(user);
    editForm.setValue('email', user.email);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="dark:text-white flex items-center gap-2">
                <User className="h-5 w-5" />
                Admin User Management
              </CardTitle>
              <CardDescription className="dark:text-gray-300">
                Manage administrator accounts and permissions
              </CardDescription>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Add Admin User
                </Button>
              </DialogTrigger>
              <DialogContent className="dark:bg-gray-800 dark:border-gray-700">
                <DialogHeader>
                  <DialogTitle className="dark:text-white">Create New Admin User</DialogTitle>
                  <DialogDescription className="dark:text-gray-300">
                    Add a new administrator account to the system
                  </DialogDescription>
                </DialogHeader>
                <Form {...createForm}>
                  <form onSubmit={createForm.handleSubmit(handleCreateUser)} className="space-y-4">
                    <FormField
                      control={createForm.control}
                      name="email"
                      rules={{ 
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email address"
                        }
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="dark:text-white">Email</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="email" 
                              placeholder="admin@example.com"
                              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={createForm.control}
                      name="password"
                      rules={{ 
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters"
                        }
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="dark:text-white">Password</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="password"
                              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={createForm.control}
                      name="confirmPassword"
                      rules={{ 
                        required: "Please confirm your password"
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="dark:text-white">Confirm Password</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="password"
                              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Create User</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="dark:text-gray-300">Email</TableHead>
                <TableHead className="dark:text-gray-300">Role</TableHead>
                <TableHead className="dark:text-gray-300">Created</TableHead>
                <TableHead className="dark:text-gray-300">Last Login</TableHead>
                <TableHead className="dark:text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="dark:text-white">{user.email}</TableCell>
                  <TableCell className="dark:text-white">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs font-medium">
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell className="dark:text-white">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="dark:text-white">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditDialog(user)}
                        className="flex items-center gap-1"
                      >
                        <Edit className="h-3 w-3" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteUser(user.id)}
                        className="flex items-center gap-1"
                        disabled={adminUsers.length === 1}
                      >
                        <Trash2 className="h-3 w-3" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="dark:bg-gray-800 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="dark:text-white">Edit Admin User</DialogTitle>
            <DialogDescription className="dark:text-gray-300">
              Update administrator account details
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(handleEditUser)} className="space-y-4">
              <FormField
                control={editForm.control}
                name="email"
                rules={{ 
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address"
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-white">Email</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="email"
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Update User</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsersTab;
