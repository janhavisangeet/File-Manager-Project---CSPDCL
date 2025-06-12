import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { getAllPdfs } from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import { Pdf } from "@/types";

const AllPdfsPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["pdfs", { selectedDate: selectedDate?.toISOString(), page }],
    queryFn: () =>
      getAllPdfs({ date: selectedDate?.toISOString(), page, limit }),
    staleTime: 10000,
  });

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

  const totalPages = data?.data?.pagination?.totalPages || 1;

  return (
    <div className="container">
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
          <CardTitle>All PDFs</CardTitle>
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
              disabled={page >= totalPages}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AllPdfsPage;
