import Image from "next/image";

export function Logo() {
  return (
    <Image src="/meethub-logo.svg" width={80} height={40} alt="Meethub" />
  );
}