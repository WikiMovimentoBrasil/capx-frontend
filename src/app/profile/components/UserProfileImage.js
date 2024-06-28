import Image from "next/image";

export default function UserProfileImage({ imageUrl, darkMode }) {
  return (
    <Image
      src={imageUrl ?? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII='}
      width={192}
      height={192}
      alt="User Profile Photo"
      className={"w-48 h-48 mx-auto rounded-full ring-offset-4 ring-8 ring-capx-secondary-purple" + (darkMode ? " ring-offset-capx-dark-box-bg" : " ring-offset-capx-light-box-bg")}
    />
  )
}