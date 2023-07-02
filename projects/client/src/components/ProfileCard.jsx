import { Card } from "react-daisyui";
import { getEmail } from "@/api/token";
import LogoutBtn from "./LogoutBtn";
import useProfile from "@/hooks/queries/common/useProfile";
import Loading from "@/components/Loading";
import Error from "@/pages/error/Error";

export default function ProfileCard() {
  const { data, isLoading, isError } = useProfile(getEmail());
  return (
    <Card className="mx-3 mb-6">
      <Card.Image
        src={data && data.profile_pic}
        className="w-[250px] h-[250px] rounded-full"
      />
      <Card.Body>
        {!isLoading ? (
          <>
            <Card.Title className="mb-3">
              <b>{data?.username}</b>
            </Card.Title>
            <div className="flex flex-wrap gap-2">
              <LogoutBtn />
            </div>
          </>
        ) : (
          <Loading />
        )}
        {isError && <Error />}
      </Card.Body>
    </Card>
  );
}
