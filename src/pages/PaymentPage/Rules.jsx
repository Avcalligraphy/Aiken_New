import { useAuthUser } from "react-auth-kit";
import Layout from "../../Layouts";
import PaymentRules from "../../components/PaymentComponents/PaymentRules";
import { useLocation } from "react-router-dom";


const RulesPage = () => {
  const location = useLocation();
    const { doctor } = location.state || {}; // Ambil data doctor dari state
//   const [page, setPage] = useState(0);
//   const auth = useAuthUser();
  return (
    <Layout>
      <div
        className="min-h-screen px-[15px] pt-[15px] pb-[200px] "
        style={{
          backgroundImage: "url(/ornaments/ornaments.png)",
          // backgroundSize: "cover",
        }}
      >
        <img alt="text-mood" src="/ornaments/textMoodIcon.png" />
        <h1 className=" mt-[-22px] font-bold text-[20px] ">
          Requirement Payment
        </h1>
        <PaymentRules doctor={doctor} />
      </div>
    </Layout>
  );
};

export default RulesPage;
