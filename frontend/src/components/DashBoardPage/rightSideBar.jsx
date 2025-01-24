import "./RightSideBar.css";
import NetMeteringCard from "./NetMeteringCard";
import CarbonCreditCard from "./CarbonCreditCard";

const RightSidebar = () => {
    const [userName, setUserName] = useState("");

    // Fetch user details from the backend
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch("/api/user"); // Replace with your actual API endpoint
                const data = await response.json();
                setUserName(data.name); // Assuming the API response has a 'name' field
            } catch (error) {
                console.error("Failed to fetch user details:", error);
            }
        };

        fetchUserDetails();
    }, []);

    return (
        <div className="rightsidebar">
            <div className="welcome-section">
                <p>Hello <b>Shruti</b></p>
                <div className="connect-btn">
                    <button className="metamask-button">
                        🦁Connect to Metamask
                    </button>
                </div>
            </div>

            <div className="card1">
                <NetMeteringCard></NetMeteringCard>
            </div>

            <div className="card2">
                <CarbonCreditCard></CarbonCreditCard>
            </div>
        </div>
    );
};

export default RightSidebar;