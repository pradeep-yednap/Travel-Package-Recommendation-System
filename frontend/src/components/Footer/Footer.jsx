import { FaFacebookF } from "react-icons/fa";
import { AiOutlineTwitter, AiFillYoutube } from "react-icons/ai";
import { BiLogoPinterestAlt } from "react-icons/bi";
import Logo from "../../assets/images/logo.png"

function Footer() {
  const iconsTab = [
    { icon: <FaFacebookF /> },
    { icon: <AiOutlineTwitter /> },
    { icon: <AiFillYoutube /> },
    { icon: <BiLogoPinterestAlt /> },
  ];
  return (
    <>
      <footer className="bg-white" style={{ padding: '5px', margin: '5px' }}>
        <div className="container mx-auto ">
          {/* footer div all */}
          <div className="flex justify-between flex-col md:flex-row  items-center md:items-start  md:gap-[5rem] text-left">
            {/* logo side */}
            <div className="flex flex-col w-1/2 md:p-0 py-10 gap-8">
              <img
                src={Logo}
                alt="footer_logo"
                className="w-[18rem]"
              />
              <p className="text-[15px] font-medium text-[#646464]">
              "Explore the world from the comfort of your screen! Our Destination Spotlights highlight the beauty, history, 
              and unique experiences each location has to offer. Let your wanderlust guide you to your next adventure."
              </p>
              {/* socials */}
              <div className="flex gap-7 text-[18px] text-[#646464] justify-center md:justify-start">
                {iconsTab.map(({ icon }, index) => {
                  return (
                    <div
                      key={index}
                      className="text-2xl bg-[#efefef] p-2 rounded-full hover:bg-[#36944] hover:text-white"
                      style={{ transition: "all 0.3s" }}
                    >
                      {icon}
                    </div>
                  );
                })}
              </div>
              <p className="text-[16px] font-medium text-[#646464]">
                Privacy Policy | © {new Date().getFullYear()} CSIT Batch 2076  <br />{" "}
                Design by{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.travelersathi.com/"
                >
                 TravelerSathi
                </a>
              </p>
            </div>

            {/* middle div */}
            <div className="flex flex-col gap-8 relative">
              <p className="text-[22px] font-bold footer-main">Discover</p>

              <span className="top-[33px] absolute w-[7rem] h-[4px] bg-[#369445]"></span>

              <p className="text-[16px] hover:text-[#36944] cursor-pointer text-[#646464] font-medium hover:font-bold">
               Home
              </p>
              <p className="text-[16px] hover:text-[#36944] cursor-pointer text-[#646464] font-medium hover:font-bold">
                About
              </p>
              <p className="text-[16px] hover:text-[#36944] cursor-pointer text-[#646464] font-medium hover:font-bold">
                Tour
              </p>
            </div>

            {/* right div */}
            <div className="flex flex-col gap-8 relative">
              <p className="text-[22px] font-bold footer-main">Quick Links</p>

              <span className="top-[33px] absolute w-[7rem] h-[4px] bg-[#36944]"></span>

              <p className="text-[16px]  text-[#646464] font-bold">
                Gallery:
              </p>
              <p className="text-[16px] text-[#646464] font-bold">Login</p>
              <p className="text-[16px] text-[#646464] font-bold ">
                Register
              </p>
            </div>

            {/* middle div */}
            <span></span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;