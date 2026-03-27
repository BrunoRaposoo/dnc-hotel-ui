 
"use client";
import { Reservation } from "@/src/types/Reservation";
import { User } from "@/src/types/User";
import { useSession } from "next-auth/react";
import Image from "next/image";

type UserDetailProps = {
  reservation?: Reservation;
  user?: User;
};

const UserDetail = ({ reservation, user: directUser }: UserDetailProps) => {
  const { data: session } = useSession();

  let displayUser: User | null = null;

  if (directUser) {
    displayUser = directUser;
  } else if (reservation && session?.user?.role) {
    displayUser =
      session.user.role === "USER"
        ? reservation.hotel.owner
        : reservation.user;
  }

  if (!displayUser) return null;

  return (
    <div className="mt-4 flex">
      <Image
        src={displayUser.avatar ?? "/default-profile.jpg"}
        alt={`Foto do anfitrião ${displayUser.name}`}
        width={56}
        height={56}
        className="rounded-full w-14 h-14 object-cover"
      />
      <div className="flex flex-col ml-2 justify-center">
        <b>Anfitriã(o): {displayUser.name}</b>
        <span className="font-medium">
          Desde {new Date(displayUser.createdAt).getFullYear()}
        </span>
      </div>
    </div>
  );
};

export default UserDetail;