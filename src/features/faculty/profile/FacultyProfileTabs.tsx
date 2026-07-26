import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, Save, Upload } from "lucide-react";
import { SectionCard } from "@/components/common/SectionCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { facultyService } from "@/services/faculty.service";

const DEPARTMENTS = [
  "Civil Engineering",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Information Technology",
  "Metallurgical Engineering",
  "Electronics & Telecommunication Engineering",
];
const DESIGNATIONS = ["Lecturer", "Senior Lecturer", "Head of Department", "Principal"];
const STATES = ["Maharashtra", "Karnataka", "Goa", "Gujarat"];
const CLASSES = ["First Class with Distinction", "First Class", "Second Class", "Pass Class"];
const COURSES = ["B.E.", "B.Tech", "M.E.", "M.Tech", "PhD", "Other"];
const UNIVERSITIES = ["Shivaji University", "Savitribai Phule Pune University", "MSBTE", "Other"];

function Field({
  label,
  id,
  required,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      {children}
    </div>
  );
}

function Select({ id, options, defaultValue }: { id: string; options: string[]; defaultValue?: string }) {
  return (
    <select
      id={id}
      defaultValue={defaultValue}
      className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
    >
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}

function SaveButton({ pending }: { pending: boolean }) {
  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
      Save Changes
    </Button>
  );
}

export function FacultyProfileTabs() {
  const { data: profile } = useQuery({
    queryKey: ["faculty", "profile"],
    queryFn: () => facultyService.getProfile(),
  });
  const [sameAddress, setSameAddress] = useState(true);

  const save = useMutation({
    mutationFn: () => facultyService.updateProfile(),
    onSuccess: () => toast.success("Changes saved successfully"),
    onError: () => toast.error("Could not save your changes."),
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    save.mutate();
  };

  if (!profile) {
    return (
      <SectionCard title="Your Profile">
        <Skeleton className="h-72 w-full" />
      </SectionCard>
    );
  }

  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="mb-4 flex h-auto w-full flex-wrap justify-start gap-1 bg-panel p-1">
        <TabsTrigger value="profile">Profile Information</TabsTrigger>
        <TabsTrigger value="qualification">Qualification Detail</TabsTrigger>
        <TabsTrigger value="academic">Academic Detail</TabsTrigger>
        <TabsTrigger value="bank">Bank Detail</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
      </TabsList>

      {/* Profile Information */}
      <TabsContent value="profile">
        <form onSubmit={submit} className="space-y-6">
          <SectionCard title="Department & Designation">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <Field id="department" label="Department" required>
                <Select id="department" options={DEPARTMENTS} defaultValue={profile.department} />
              </Field>
              <Field id="designation" label="Designation" required>
                <Select id="designation" options={DESIGNATIONS} defaultValue={profile.designation} />
              </Field>
            </div>
          </SectionCard>

          <SectionCard title="Personal Information">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <Field id="facultyName" label="Faculty Name" required>
                <Input id="facultyName" defaultValue={profile.fullName} />
              </Field>
              <Field id="dob" label="Date of Birth" required>
                <Input id="dob" type="date" defaultValue="1979-04-12" />
              </Field>
              <Field id="gender" label="Gender" required>
                <Select id="gender" options={["Male", "Female", "Other"]} />
              </Field>
              <Field id="nationality" label="Nationality" required>
                <Input id="nationality" defaultValue="Indian" />
              </Field>
              <Field id="domicile" label="Domicile State" required>
                <Select id="domicile" options={STATES} />
              </Field>
              <Field id="appointment" label="Date of Appointment" required>
                <Input id="appointment" type="date" defaultValue="2009-07-01" />
              </Field>
              <Field id="category" label="Constitutional Category of Admission" required>
                <Select id="category" options={["OPEN", "OBC", "SC", "ST", "NT-C", "VJ-A"]} />
              </Field>
              <Field id="reservation" label="Special Reservation, if any" required>
                <Select id="reservation" options={["None", "PWD", "Ex-Serviceman", "Women"]} />
              </Field>
              <Field id="email" label="Email ID" required>
                <Input id="email" type="email" defaultValue={profile.email} />
              </Field>
              <Field id="mobile" label="Mobile No." required>
                <Input id="mobile" defaultValue={profile.mobile} />
              </Field>
              <Field id="stdCode" label="Residential Telephone (STD Code)" required>
                <Input id="stdCode" defaultValue="0231" />
              </Field>
              <Field id="telephone" label="Residential Telephone No." required>
                <Input id="telephone" defaultValue="2645123" />
              </Field>
              <Field id="officialEmail" label="Official Email ID" required>
                <Input id="officialEmail" type="email" defaultValue={profile.email} />
              </Field>
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Field id="subjects" label="Subjects Taught" required>
                <Textarea id="subjects" rows={3} defaultValue="Physical Metallurgy, Metallurgical Thermodynamics" />
              </Field>
              <Field id="additional" label="Additional Information">
                <Textarea id="additional" rows={3} />
              </Field>
            </div>
          </SectionCard>

          <SectionCard title="Permanent Address">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <Field id="permAddress" label="Address" required>
                <Textarea id="permAddress" rows={3} defaultValue="Plot 14, Rajarampuri 6th Lane" />
              </Field>
              <Field id="permDistrict" label="District" required>
                <Input id="permDistrict" defaultValue="Kolhapur" />
              </Field>
              <Field id="permState" label="State" required>
                <Select id="permState" options={STATES} />
              </Field>
              <Field id="permPincode" label="Pincode" required>
                <Input id="permPincode" defaultValue="416008" />
              </Field>
            </div>
          </SectionCard>

          <SectionCard
            title="Correspondence Address"
            actions={
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                <Switch checked={sameAddress} onCheckedChange={setSameAddress} />
                Correspondence Address is same as Permanent Address
              </label>
            }
          >
            {sameAddress ? (
              <p className="text-sm text-muted-foreground">Same as permanent address.</p>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <Field id="corrAddress" label="Address" required>
                  <Textarea id="corrAddress" rows={3} />
                </Field>
                <Field id="corrDistrict" label="District" required>
                  <Input id="corrDistrict" />
                </Field>
                <Field id="corrState" label="State" required>
                  <Select id="corrState" options={STATES} />
                </Field>
                <Field id="corrPincode" label="Pincode" required>
                  <Input id="corrPincode" />
                </Field>
              </div>
            )}
          </SectionCard>

          <SaveButton pending={save.isPending} />
        </form>
      </TabsContent>

      {/* Qualification Detail */}
      <TabsContent value="qualification">
        <form onSubmit={submit} className="space-y-6">
          {["Graduation Degree detail", "Post Graduation detail", "PhD detail", "Other detail"].map((block, i) => (
            <SectionCard key={block} title={block}>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <Field id={`course-${i}`} label="Course">
                  <Select id={`course-${i}`} options={COURSES} />
                </Field>
                <Field id={`branch-${i}`} label="Branch Name">
                  <Input id={`branch-${i}`} placeholder="Branch name" />
                </Field>
                <Field id={`class-${i}`} label="Class Obtained">
                  <Select id={`class-${i}`} options={CLASSES} />
                </Field>
                <Field id={`univ-${i}`} label="University / Board">
                  <Select id={`univ-${i}`} options={UNIVERSITIES} />
                </Field>
              </div>
            </SectionCard>
          ))}
          <SaveButton pending={save.isPending} />
        </form>
      </TabsContent>

      {/* Academic Detail */}
      <TabsContent value="academic">
        <form onSubmit={submit} className="space-y-6">
          <SectionCard title="Papers Published">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="natPapers" label="No. of National Papers">
                <Input id="natPapers" type="number" min={0} defaultValue={0} />
              </Field>
              <Field id="intPapers" label="No. of International Papers">
                <Input id="intPapers" type="number" min={0} defaultValue={0} />
              </Field>
            </div>
          </SectionCard>
          <SectionCard title="Conference Papers Presented">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="natConf" label="No. of National Papers">
                <Input id="natConf" type="number" min={0} defaultValue={0} />
              </Field>
              <Field id="intConf" label="No. of International Papers">
                <Input id="intConf" type="number" min={0} defaultValue={0} />
              </Field>
            </div>
          </SectionCard>
          <SectionCard title="Others">
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                ["books", "Books Published / IPRs / Patents"],
                ["membership", "Professional Membership"],
                ["consultancy", "Consultancy Activities"],
                ["awards", "Awards"],
                ["grants", "Grants Fetched"],
                ["interaction", "Interaction With Professional Institution"],
              ].map(([id, label]) => (
                <Field key={id} id={id} label={label}>
                  <Textarea id={id} rows={3} />
                </Field>
              ))}
            </div>
          </SectionCard>
          <SaveButton pending={save.isPending} />
        </form>
      </TabsContent>

      {/* Bank Detail */}
      <TabsContent value="bank">
        <form onSubmit={submit} className="space-y-6">
          <SectionCard title="Bank Detail" className="max-w-3xl">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="bankName" label="Bank Name" required>
                <Input id="bankName" defaultValue="Bank of Maharashtra" />
              </Field>
              <Field id="branchName" label="Branch Name" required>
                <Input id="branchName" defaultValue="Rajarampuri, Kolhapur" />
              </Field>
              <Field id="accountNo" label="Account No" required>
                <Input id="accountNo" defaultValue="60123456789" />
              </Field>
              <Field id="ifsc" label="IFSC Code" required>
                <Input id="ifsc" defaultValue="MAHB0000412" />
              </Field>
            </div>
          </SectionCard>
          <SaveButton pending={save.isPending} />
        </form>
      </TabsContent>

      {/* Documents */}
      <TabsContent value="documents">
        <div className="space-y-6">
          <SectionCard title="Photo">
            <p className="mb-4 rounded-md bg-panel p-3 text-xs text-muted-foreground">
              Recent colour photo, 3.5 × 4.5 cm, without border and headgear (except for religious or
              racial custom). Scan at 100 dpi or higher, file size up to 150 kb, .jpg format only.
            </p>
            <div className="flex flex-wrap items-end gap-4">
              <Field id="photoFile" label="Upload Latest Passport Size Photo">
                <Input id="photoFile" type="file" accept="image/jpeg" />
              </Field>
              <img
                src={profile.photoUrl}
                alt={profile.fullName}
                width={96}
                height={96}
                loading="lazy"
                className="h-24 w-24 rounded-md object-cover"
              />
            </div>
            <Button className="mt-4" onClick={() => toast.success("Photo updated")}>
              <Upload className="mr-2 h-4 w-4" />
              Update Photo
            </Button>
          </SectionCard>

          <SectionCard title="Signature">
            <p className="mb-4 rounded-md bg-panel p-3 text-xs text-muted-foreground">
              Sign on white paper with a black pen. Scan at 100 dpi or higher, file size up to 150 kb,
              .jpg format only.
            </p>
            <Field id="signFile" label="Upload Signature">
              <Input id="signFile" type="file" accept="image/jpeg" className="max-w-md" />
            </Field>
            <Button className="mt-4" onClick={() => toast.success("Signature updated")}>
              <Upload className="mr-2 h-4 w-4" />
              Update Signature
            </Button>
          </SectionCard>

          <SectionCard title="Aadhaar & PAN">
            <p className="mb-4 rounded-md bg-panel p-3 text-xs text-muted-foreground">
              Scan at 100 dpi or higher, file size up to 300 kb, .pdf format only.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Documents uploaded");
              }}
              className="space-y-6"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="aadhaarNo" label="Aadhaar Number" required>
                  <Input id="aadhaarNo" inputMode="numeric" placeholder="XXXX XXXX XXXX" />
                </Field>
                <Field id="aadhaarFile" label="Upload Aadhaar (PDF)" required>
                  <Input id="aadhaarFile" type="file" accept="application/pdf" />
                </Field>
                <Field id="panNo" label="PAN" required>
                  <Input id="panNo" placeholder="ABCDE1234F" />
                </Field>
                <Field id="panFile" label="Upload PAN (PDF)" required>
                  <Input id="panFile" type="file" accept="application/pdf" />
                </Field>
              </div>
              <Button type="submit" size="lg">
                <Upload className="mr-2 h-4 w-4" />
                Upload Documents
              </Button>
            </form>
          </SectionCard>
        </div>
      </TabsContent>
    </Tabs>
  );
}
