import ProfileCard from "../components/profile/ProfileCard.jsx";
import ProfileActions from "../components/profile/ProfileActions.jsx";

function Profile() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900"> Wallet</h1>

        <p className="mt-1 text-sm text-gray-500">Your personal finance hub</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ProfileCard />
        </div>

        <div>
          <ProfileActions />
        </div>
      </div>
    </div>
  );
}

export default Profile;
