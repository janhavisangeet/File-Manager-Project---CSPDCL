// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// import { useForm } from "react-hook-form";
// import { createPdf } from "@/http/api";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { LoaderCircle } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { format } from "date-fns";
// import { cn } from "@/lib/utils"; // if you're using the classNames helper

// //const currentYear = new Date().getFullYear();

// const formSchema = z.object({
//   date: z.date({ required_error: "Date is required" }),
//   file: z
//     .instanceof(FileList)
//     .refine((file) => file.length === 1, "PDF file is required"),
// });

// const CreatePdf = () => {
//   const navigate = useNavigate();

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       date: new Date(),
//     },
//   });

//   const fileRef = form.register("file");

//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: createPdf,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["pdfs"] });
//       navigate("/dashboard/pdfs");
//     },
//   });

//   const onSubmit = (values: z.infer<typeof formSchema>) => {
//     const formData = new FormData();
//     // formData.append(
//     //   "month",
//     //   values.date.toLocaleString("default", { month: "long" })
//     // );
//     // formData.append("year", values.date.getFullYear().toString());
//     formData.append("createdAt", values.date.toISOString());

//     formData.append("file", values.file[0]);

//     mutation.mutate(formData);
//   };

//   return (
//     <section>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)}>
//           <div className="flex items-center justify-between">
//             <Breadcrumb>
//               <BreadcrumbList>
//                 <BreadcrumbItem>
//                   <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
//                 </BreadcrumbItem>
//                 <BreadcrumbSeparator />
//                 <BreadcrumbItem>
//                   <BreadcrumbLink href="/dashboard/pdfs">PDFs</BreadcrumbLink>
//                 </BreadcrumbItem>
//                 <BreadcrumbSeparator />
//                 <BreadcrumbItem>
//                   <BreadcrumbPage>Create</BreadcrumbPage>
//                 </BreadcrumbItem>
//               </BreadcrumbList>
//             </Breadcrumb>
//             <div className="flex items-center gap-4">
//               <Link to="/dashboard/pdfs">
//                 <Button variant="outline">Cancel</Button>
//               </Link>
//               <Button type="submit" disabled={mutation.isPending}>
//                 {mutation.isPending && (
//                   <LoaderCircle className="animate-spin mr-2" />
//                 )}
//                 Submit
//               </Button>
//             </div>
//           </div>

//           <Card className="mt-6">
//             <CardHeader>
//               <CardTitle>Create a new PDF</CardTitle>
//               <CardDescription>
//                 Fill out the form below to upload a PDF.
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid gap-6">
//                 {/* <FormField
//                   control={form.control}
//                   name="month"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Month</FormLabel>
//                       <Select
//                         onValueChange={field.onChange}
//                         defaultValue={field.value}
//                       >
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select a month" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           {[
//                             "January",
//                             "February",
//                             "March",
//                             "April",
//                             "May",
//                             "June",
//                             "July",
//                             "August",
//                             "September",
//                             "October",
//                             "November",
//                             "December",
//                           ].map((m) => (
//                             <SelectItem key={m} value={m}>
//                               {m}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="year"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Year</FormLabel>
//                       <FormControl>
//                         <Input
//                           type="number"
//                           min="1900"
//                           max={currentYear}
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 /> */}
//                 <FormField
//                   control={form.control}
//                   name="date"
//                   render={({ field }) => (
//                     <FormItem className="flex flex-col">
//                       <FormLabel>Date</FormLabel>
//                       <FormControl>
//                         <Popover>
//                           <PopoverTrigger asChild>
//                             <Button
//                               variant={"outline"}
//                               className={cn(
//                                 "w-[280px] justify-start text-left font-normal",
//                                 !field.value && "text-muted-foreground"
//                               )}
//                             >
//                               {field.value ? (
//                                 format(field.value, "PPP")
//                               ) : (
//                                 <span>Pick a date</span>
//                               )}
//                             </Button>
//                           </PopoverTrigger>
//                           <PopoverContent className="w-auto p-0" align="start">
//                             <Calendar
//                               mode="single"
//                               selected={field.value}
//                               onSelect={field.onChange}
//                               initialFocus
//                             />
//                           </PopoverContent>
//                         </Popover>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="file"
//                   render={() => (
//                     <FormItem>
//                       <FormLabel>PDF File</FormLabel>
//                       <FormControl>
//                         <Input
//                           type="file"
//                           accept="application/pdf"
//                           {...fileRef}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//             </CardContent>
//           </Card>
//         </form>
//       </Form>
//     </section>
//   );
// };

// export default CreatePdf;

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { createPdf } from "@/http/api";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Schema
const formSchema = z.object({
  date: z.date({ required_error: "Date is required" }),
  file: z
    .instanceof(FileList)
    .refine((file) => file.length === 1, "PDF file is required"),
});

const CreatePdf = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  const fileRef = form.register("file");
  const mutation = useMutation({
    mutationFn: createPdf,
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["pdfs"] });
      navigate("/dashboard/pdfs");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("date", values.date.toISOString());
    formData.append("file", values.file[0]);
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
                  <BreadcrumbPage>Create</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-4">
              <Link to={"/dashboard/pdfs"}>
                <Button variant="outline">Cancel</Button>
              </Link>
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
              <CardTitle>Create a new PDF</CardTitle>
              <CardDescription>
                Fill out the form below to upload a PDF.
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
                              variant={"outline"}
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

                <FormField
                  control={form.control}
                  name="file"
                  render={() => (
                    <FormItem>
                      <FormLabel>PDF File</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="application/pdf"
                          {...fileRef}
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

export default CreatePdf;
