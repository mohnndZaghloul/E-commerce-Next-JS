import { getCurrentUser } from "@/actions/customers-actions";
import AddPhone from "@/components/profile/AddPhone";
import ResetPassword from "@/components/profile/ResetPassword";
import Image from "next/image";

export default async function ProfilePage() {
  const profile = await getCurrentUser();
  return (
    <main className="container flex flex-col md:flex-row gap-4">
      <div className="relative w-full mx-auto flex-2 max-w-50 h-fit aspect-square border-2 border-primary flex justify-center items-center rounded-full bg-card">
        {profile?.image ? (
          <Image
            className="rounded-full object-cover"
            src={profile?.image!}
            alt={profile.name}
            fill
          />
        ) : (
          <div className="text-9xl text-primary">
            {profile?.name[0].toUpperCase()}
          </div>
        )}
      </div>
      <div className="flex-3">
        <h1 className="uppercase text-4xl text-center md:text-start">
          {profile?.name}
        </h1>
        <div className="bg-card capitalize rounded-3xl p-8 my-8 space-y-4">
          <div>
            <span className="text-xl text-primary">Email</span>
            <p className="indent-4">{profile?.email}</p>
          </div>
          <div>
            <span className="text-xl text-primary">Role</span>
            <p className="indent-4">{profile?.role}</p>
          </div>
          <AddPhone id={profile?.id!} phone={profile?.phone!} />
          <ResetPassword id={profile?.id!} />
        </div>
      </div>
    </main>
  );
}
