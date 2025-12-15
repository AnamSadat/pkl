"use client";

import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import { AlertCircle, CheckCircle2, Info, ChevronRight } from "lucide-react";
import { Fragment, useState } from "react";
import { InputSearch } from "@/components/molecules";

type LogLevel = "info" | "success" | "warning" | "error";
type LogAction =
  | "login"
  | "logout"
  | "create"
  | "update"
  | "delete"
  | "view"
  | "export";

interface SystemLog {
  id: number;
  timestamp: string;
  user: string;
  action: LogAction;
  level: LogLevel;
  module: string;
  description: string;
  ipAddress?: string;
}

interface LogActivityFeedProps {
  data: SystemLog[];
  modules: string[];
  search: string;
  onSearchChange: (value: string) => void;
  levelFilter: string;
  onLevelFilterChange: (value: string) => void;
  moduleFilter: string;
  onModuleFilterChange: (value: string) => void;
  onReset: () => void;
}

function getLevelIcon(level: LogLevel) {
  switch (level) {
    case "success":
      return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
    case "error":
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    case "warning":
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    default:
      return <Info className="h-4 w-4 text-blue-500" />;
  }
}

function getActionLabel(action: LogAction) {
  const labels: Record<LogAction, string> = {
    login: "LOGIN",
    logout: "LOGOUT",
    create: "CREATE",
    update: "UPDATE",
    delete: "DELETE",
    view: "VIEW",
    export: "EXPORT",
  };
  return labels[action] || action.toUpperCase();
}

export function LogActivityFeed({
  data,
  modules,
  search,
  onSearchChange,
  levelFilter,
  onLevelFilterChange,
  moduleFilter,
  onModuleFilterChange,
  onReset,
}: LogActivityFeedProps) {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  return (
    <Card>
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Activity Feed</CardTitle>
            <CardDescription>
              {data.length.toLocaleString()} log entries
            </CardDescription>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <InputSearch
            search={search}
            onSearchChange={onSearchChange}
            placeholder="Cari user, modul, atau deskripsi..."
          />
          <div className="flex flex-wrap gap-2">
            <Select value={levelFilter} onValueChange={onLevelFilterChange}>
              <SelectTrigger className="h-9 w-[140px]">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Level</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
            <Select value={moduleFilter} onValueChange={onModuleFilterChange}>
              <SelectTrigger className="h-9 w-[160px]">
                <SelectValue placeholder="Modul" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Modul</SelectItem>
                {modules.map((mod) => (
                  <SelectItem key={mod} value={mod}>
                    {mod}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={onReset}>
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-[500px]">
          <Table>
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow className="hover:bg-transparent border-b">
                <TableHead className="w-[30px] px-2"></TableHead>
                <TableHead className="w-[40px] px-2">Level</TableHead>
                <TableHead className="w-[160px] px-3">Timestamp</TableHead>
                <TableHead className="w-[100px] px-3">Module</TableHead>
                <TableHead className="w-[80px] px-3">Action</TableHead>
                <TableHead className="px-3">Summary</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-40 text-center text-muted-foreground"
                  >
                    Tidak ada log yang sesuai filter.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((log) => (
                  <Fragment key={log.id}>
                    <TableRow
                      className="cursor-pointer hover:bg-muted/50 border-b border-border/50"
                      onClick={() =>
                        setExpandedRow(expandedRow === log.id ? null : log.id)
                      }
                    >
                      <TableCell className="px-2 py-2">
                        <ChevronRight
                          className={`h-4 w-4 text-muted-foreground transition-transform ${
                            expandedRow === log.id ? "rotate-90" : ""
                          }`}
                        />
                      </TableCell>
                      <TableCell className="px-2 py-2">
                        {getLevelIcon(log.level)}
                      </TableCell>
                      <TableCell className="px-3 py-2 font-mono text-xs text-muted-foreground whitespace-nowrap">
                        {log.timestamp}
                      </TableCell>
                      <TableCell className="px-3 py-2">
                        <Badge
                          variant="secondary"
                          className="font-mono text-xs px-1.5 py-0"
                        >
                          {log.module}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-3 py-2">
                        <span className="font-mono text-xs font-medium">
                          {getActionLabel(log.action)}
                        </span>
                      </TableCell>
                      <TableCell className="px-3 py-2 max-w-[300px]">
                        <div className="flex items-center gap-2">
                          <span className="text-sm truncate">
                            {log.description}
                          </span>
                          {log.user && (
                            <span className="text-xs text-muted-foreground shrink-0">
                              | {log.user}
                            </span>
                          )}
                          {log.ipAddress && (
                            <span className="text-xs text-muted-foreground shrink-0">
                              | {log.ipAddress}
                            </span>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                    {expandedRow === log.id && (
                      <TableRow
                        key={`${log.id}-expanded`}
                        className="bg-muted/30 hover:bg-muted/30"
                      >
                        <TableCell colSpan={6} className="px-4 py-3">
                          <div className="space-y-2 text-sm">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div>
                                <span className="text-muted-foreground text-xs">
                                  User
                                </span>
                                <p className="font-medium">{log.user}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground text-xs">
                                  IP Address
                                </span>
                                <p className="font-mono">
                                  {log.ipAddress || "-"}
                                </p>
                              </div>
                              <div>
                                <span className="text-muted-foreground text-xs">
                                  Level
                                </span>
                                <p className="capitalize">{log.level}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground text-xs">
                                  Action
                                </span>
                                <p>{getActionLabel(log.action)}</p>
                              </div>
                            </div>
                            <div>
                              <span className="text-muted-foreground text-xs">
                                Description
                              </span>
                              <p className="font-mono text-xs bg-muted/50 p-2 rounded mt-1">
                                {log.description}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export type { SystemLog, LogLevel, LogAction };
