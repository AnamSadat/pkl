"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@repo/ui/components/pagination";

interface TablePaginationProps {
  totalItems: number;
  currentPage?: number;
  totalPages?: number;
}

export function TablePagination({
  totalItems,
  currentPage = 2,
  totalPages = 3,
}: TablePaginationProps) {
  return (
    <div className="flex flex-col md:flex md:flex-row gap-4 md:gap-0 items-center justify-between border-t px-4 py-3">
      <p className="text-sm text-muted-foreground">
        Menampilkan {totalItems} data
      </p>
      <Pagination className="w-auto mx-0">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink href="#" isActive={page === currentPage}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
