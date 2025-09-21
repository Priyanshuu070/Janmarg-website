import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Settings,
  Users,
  Shield,
  Bell,
  Database,
  Mail,
  Globe,
  Lock,
  UserCheck,
  Crown,
  ShieldCheck,
  Eye,
  Edit,
  Trash2,
  Plus
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'manager' | 'viewer';
  department: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  permissions: string[];
}

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

// Mock users data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@city.gov',
    role: 'superadmin',
    department: 'City Management',
    status: 'active',
    lastLogin: '2025-01-15 09:30 AM',
    permissions: ['all']
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya.sharma@city.gov',
    role: 'admin',
    department: 'Public Works',
    status: 'active',
    lastLogin: '2025-01-14 02:15 PM',
    permissions: ['reports.read', 'reports.write', 'zones.read', 'departments.read']
  },
  {
    id: '3',
    name: 'Amit Patel',
    email: 'amit.patel@city.gov',
    role: 'manager',
    department: 'Infrastructure',
    status: 'active',
    lastLogin: '2025-01-13 11:45 AM',
    permissions: ['reports.read', 'bidding.read', 'bidding.write']
  },
  {
    id: '4',
    name: 'Sneha Gupta',
    email: 'sneha.gupta@city.gov',
    role: 'viewer',
    department: 'Finance',
    status: 'inactive',
    lastLogin: '2025-01-10 04:20 PM',
    permissions: ['reports.read', 'zones.read']
  }
];

// Mock permissions data
const mockPermissions: Permission[] = [
  // Reports
  { id: 'reports.read', name: 'View Reports', description: 'Can view citizen reports', category: 'Reports' },
  { id: 'reports.write', name: 'Manage Reports', description: 'Can create, edit, and delete reports', category: 'Reports' },
  { id: 'reports.assign', name: 'Assign Reports', description: 'Can assign reports to departments', category: 'Reports' },

  // Zones & Wards
  { id: 'zones.read', name: 'View Zones', description: 'Can view zone information', category: 'Geography' },
  { id: 'zones.write', name: 'Manage Zones', description: 'Can create and edit zones', category: 'Geography' },
  { id: 'wards.read', name: 'View Wards', description: 'Can view ward information', category: 'Geography' },
  { id: 'wards.write', name: 'Manage Wards', description: 'Can create and edit wards', category: 'Geography' },

  // Departments
  { id: 'departments.read', name: 'View Departments', description: 'Can view department information', category: 'Organization' },
  { id: 'departments.write', name: 'Manage Departments', description: 'Can create and edit departments', category: 'Organization' },

  // Bidding
  { id: 'bidding.read', name: 'View Bidding', description: 'Can view bidding information', category: 'Procurement' },
  { id: 'bidding.write', name: 'Manage Bidding', description: 'Can create and manage bids', category: 'Procurement' },

  // System
  { id: 'users.read', name: 'View Users', description: 'Can view user accounts', category: 'System' },
  { id: 'users.write', name: 'Manage Users', description: 'Can create and edit user accounts', category: 'System' },
  { id: 'settings.read', name: 'View Settings', description: 'Can view system settings', category: 'System' },
  { id: 'settings.write', name: 'Manage Settings', description: 'Can modify system settings', category: 'System' }
];

const SettingsPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditingUser, setIsEditingUser] = useState(false);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'superadmin':
        return <Crown className="w-4 h-4 text-yellow-500" />;
      case 'admin':
        return <ShieldCheck className="w-4 h-4 text-blue-500" />;
      case 'manager':
        return <UserCheck className="w-4 h-4 text-green-500" />;
      case 'viewer':
        return <Eye className="w-4 h-4 text-gray-500" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'superadmin':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'admin':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'manager':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'viewer':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    return status === 'active'
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-red-100 text-red-800 border-red-200';
  };

  const handleUserRoleChange = (userId: string, newRole: string) => {
    setUsers(prev => prev.map(user =>
      user.id === userId
        ? { ...user, role: newRole as User['role'] }
        : user
    ));
  };

  const handleUserStatusChange = (userId: string, newStatus: string) => {
    setUsers(prev => prev.map(user =>
      user.id === userId
        ? { ...user, status: newStatus as User['status'] }
        : user
    ));
  };

  const handlePermissionToggle = (userId: string, permissionId: string) => {
    setUsers(prev => prev.map(user => {
      if (user.id === userId) {
        const hasPermission = user.permissions.includes(permissionId);
        const newPermissions = hasPermission
          ? user.permissions.filter(p => p !== permissionId)
          : [...user.permissions, permissionId];
        return { ...user, permissions: newPermissions };
      }
      return user;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Settings className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage system configuration and user permissions</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="users">Users & Roles</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                System Configuration
              </CardTitle>
              <CardDescription>
                Basic system settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="system-name">System Name</Label>
                  <Input id="system-name" defaultValue="Janmarg City Management" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="asia-kolkata">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asia-kolkata">Asia/Kolkata (IST)</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="america-newyork">America/New_York (EST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Default Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="mr">Marathi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select defaultValue="dd-mm-yyyy">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Feature Toggles</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-assign Reports</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically assign reports to departments based on AI analysis
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Send email notifications for high-priority reports
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Public API Access</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow external applications to access public data
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Configure how and when notifications are sent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Report Submissions</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify when new reports are submitted
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SLA Breaches</Label>
                    <p className="text-sm text-muted-foreground">
                      Alert when reports exceed SLA deadlines
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>High Priority Reports</Label>
                    <p className="text-sm text-muted-foreground">
                      Immediate notifications for critical issues
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Department Assignments</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify when reports are assigned to departments
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Email Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-server">SMTP Server</Label>
                    <Input id="smtp-server" placeholder="smtp.city.gov" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-port">SMTP Port</Label>
                    <Input id="smtp-port" placeholder="587" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users & Roles */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                User Management
              </CardTitle>
              <CardDescription>
                Manage user accounts and their roles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        {getRoleIcon(user.role)}
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                        <div className="text-xs text-muted-foreground">
                          {user.department} • Last login: {user.lastLogin}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getRoleBadgeColor(user.role)}>
                        {user.role}
                      </Badge>
                      <Badge className={getStatusBadgeColor(user.status)}>
                        {user.status}
                      </Badge>
                      <div className="flex gap-2">
                        <Select
                          value={user.role}
                          onValueChange={(value) => handleUserRoleChange(user.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="superadmin">Super Admin</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select
                          value={user.status}
                          onValueChange={(value) => handleUserStatusChange(user.id, value)}
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New User
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Permissions */}
        <TabsContent value="permissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Permission Management
              </CardTitle>
              <CardDescription>
                Assign specific permissions to user roles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {users.map((user) => (
                  <div key={user.id} className="border rounded-lg p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        {getRoleIcon(user.role)}
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.role}</div>
                      </div>
                      <Badge className={getRoleBadgeColor(user.role)}>
                        {user.role}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {mockPermissions.map((permission) => (
                        <div key={permission.id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`${user.id}-${permission.id}`}
                            checked={
                              user.permissions.includes('all') ||
                              user.permissions.includes(permission.id)
                            }
                            onChange={() => handlePermissionToggle(user.id, permission.id)}
                            disabled={user.role === 'superadmin'}
                            className="rounded"
                          />
                          <div className="grid gap-1.5 leading-none">
                            <label
                              htmlFor={`${user.id}-${permission.id}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {permission.name}
                            </label>
                            <p className="text-xs text-muted-foreground">
                              {permission.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;