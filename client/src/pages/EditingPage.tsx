import { useLocation, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createEditRequest } from "@/http/api"; // your edit request API
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { LoaderCircle } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  date: z.date({ required_error: "Date is required" }),
  newFile: z.instanceof(FileList).optional(),
});

const EditingPage = () => {
  const navigate = useNavigate();
  const { pdfId } = useParams();
  const location = useLocation();
  const state = location.state as { date: string; fileUrl: string };

  const [existingFileUrl, setExistingFileUrl] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: state?.date ? new Date(state.date) : new Date(),
    },
  });

  useEffect(() => {
    if (state?.fileUrl) {
      setExistingFileUrl(state.fileUrl);
    }
  }, [state]);

  const newFileRef = form.register("newFile");

  const mutation = useMutation({
    mutationFn: (data: FormData) => createEditRequest(pdfId!, data),
    onSuccess: () => {
      toast.success("Request created successfully!");
      navigate("/dashboard/pdfs");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("newDate", values.date.toISOString());

    if (values.newFile && values.newFile.length > 0) {
      formData.append("newFile", values.newFile[0]);
    }

    mutation.mutate(formData);
  };

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard/pdfs">PDFs</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Edit</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate("/dashboard/pdfs")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending && (
                  <LoaderCircle className="animate-spin mr-2" />
                )}
                Submit
              </Button>
            </div>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Edit PDF</CardTitle>
              <CardDescription>
                You can change the date or upload a new PDF file.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-[280px] justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {existingFileUrl && (
                  <div>
                    <FormLabel>Existing PDF</FormLabel>
                    <iframe
                      src={existingFileUrl}
                      title="Existing PDF"
                      width="100%"
                      height="500px"
                      className="border rounded"
                    />
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="newFile"
                  render={() => (
                    <FormItem>
                      <FormLabel>Replace with New PDF (optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="application/pdf"
                          {...newFileRef}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </section>
  );
};

export default EditingPage;
