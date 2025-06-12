import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { useMutation, useQuery } from "@tanstack/react-query";
import { getPdfs, createDeleteRequest } from "@/http/api";
import { Pdf } from "@/types";

import { Link } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  CirclePlus,
  Loader2,
  MoreHorizontal,
} from "lucide-react";
import { toast } from "sonner";

const PdfsPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [page, setPage] = useState(1);
  const limit = 10;

  const [openDialog, setOpenDialog] = useState(false);

  const [selectedPdfId, setSelectedPdfId] = useState<string | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["pdfs", { selectedDate: selectedDate?.toISOString(), page }],
    queryFn: () => getPdfs({ date: selectedDate?.toISOString(), page, limit }),
  });

  const { mutate: requestDelete, isPending: isDeleting } = useMutation({
    mutationFn: (pdfId: string) => createDeleteRequest(pdfId),
    onSuccess: () => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      setOpenDialog(false);
      setSelectedPdfId(null);
      toast.success("Request created successfully!");
    },
    onError: (error: unknown) => {
      if (error && typeof error === "object" && "response" in error) {
        setOpenDialog(false);
        setSelectedPdfId(null);
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        toast.error(
          axiosError.response?.data?.message || "Something went wrong."
        );
      } else {
        toast.error("Something went wrong.");
      }
    },
  });

  // const formatDate = (dateStr: string) => {
  //   const date = new Date(dateStr);
  //   return date.toLocaleDateString();
  // };
  const formatDate = (dateStr?: string | Date) => {
    if (!dateStr) return "Invalid Date";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleDateString();
  };

  const handleReset = () => {
    setSelectedDate(undefined);
    setPage(1);
  };
  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>PDFs</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Link to={"/dashboard/pdfs/create"}>
            <Button>
              <CirclePlus size={20} />
              <span className="ml-2">Add PDF</span>
            </Button>
          </Link>
        </div>

        {}

        <div className="flex gap-4 mt-6 items-end">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-muted-foreground">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[200px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    format(selectedDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date: Date | undefined) => {
                    setSelectedDate(date);
                    setPage(1);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button variant="ghost" onClick={handleReset}>
            Reset
          </Button>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>PDFs</CardTitle>
            <CardDescription>Manage your uploaded PDF files.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div>Loading...</div>
            ) : isError ? (
              <div className="text-red-500">Error loading PDFs.</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>File</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {data?.data?.data.map((pdf: Pdf) => (
                    <TableRow key={pdf._id}>
                      <TableCell>{formatDate(pdf.date)}</TableCell>
                      <TableCell>
                        <a
                          href={pdf.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline text-sm"
                        >
                          View PDF
                        </a>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link
                                to={`/dashboard/pdfs/edit/${pdf._id}`}
                                state={{
                                  date: pdf.date,
                                  fileUrl: pdf.file,
                                }}
                                className="w-full text-left"
                              >
                                Edit
                              </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => {
                                if (
                                  document.activeElement instanceof HTMLElement
                                ) {
                                  document.activeElement.blur(); // blur DropdownMenuTrigger
                                }

                                // Let DropdownMenu close fully before Dialog opens
                                setTimeout(() => {
                                  setSelectedPdfId(pdf._id);
                                  setOpenDialog(true);
                                }, 0);
                              }}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-xs text-muted-foreground">
              Showing {data?.data?.data?.length || 0} PDFs
            </div>
            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              >
                Prev
              </Button>
              <span className="text-sm">Page {page}</span>
              <Button
                size="sm"
                variant="outline"
                disabled={
                  !data?.data?.pagination?.totalPages ||
                  data?.data?.pagination.totalPages === page
                }
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      <Dialog
        open={openDialog}
        onOpenChange={(open) => {
          if (!open) {
            // Handle close only if not deleting
            if (!isDeleting) {
              setOpenDialog(false);
              setSelectedPdfId(null);
            }
          }
        }}
      >
        <DialogContent key={selectedPdfId || "default"}>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to request deletion of this PDF?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex justify-end gap-4">
            <Button
              variant="ghost"
              onClick={() => {
                if (document.activeElement instanceof HTMLElement) {
                  document.activeElement.blur();
                }
                setOpenDialog(false);
                setSelectedPdfId(null);
              }}
              disabled={isDeleting}
            >
              No
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (selectedPdfId) {
                  requestDelete(selectedPdfId);
                }
              }}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Yes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PdfsPage;
