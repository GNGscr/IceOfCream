import { motion } from "framer-motion";

export default function Modal({ setIsModalOpen }) {

    const handleClick = (e, href, heading) => {
        e.preventDefault();
        if (heading === "PHONE") {
          const phoneNumber = href.replace(/[^0-9+]/g, '');
          const telLink = `tel:${phoneNumber}`;
          window.location.href = telLink;
          window.open(telLink, '_system');
        } else if (heading === "WHATSAPP") {
          window.open(`https://wa.me/${href.replace(/[^0-9]/g, '')}`, '_blank');
        } else if (heading === "LINKEDIN") {
          window.open(href, '_blank');
        }
      }

    const handleEmail = (email="de.brand808@gmail.com") => {
        const subject = encodeURIComponent("Subject of the email");
        const body = encodeURIComponent("Body of the email");
        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
        window.open(gmailLink, '_blank');
    };
    
    if (!setIsModalOpen) return;

    return (
        <div className="order-now-modal">
          <div className="explaination">
            This is a website for demonstration purpuses Only
          </div>

          <div className="pitch">
            <div className="interest">
              If you are interested in using my services
              <span className="go-to" style={{ marginLeft: '5px' }}>go to</span>
              <a href="https://debrand-design.vercel.app/" target="_blank" rel="noopener noreferrer">
                <span className="this-site" style={{ padding: "0 0.5rem", color: "orange" }}>this site</span>
              </a>
            </div>
            <div style={{ margin: "2.85rem 0", fontSize: "1.4rem" }}>Or send</div>

            <div className="icons flex align-center justify-center gap-24 py-2">

              {/* EMAIL */}

              <motion.a
                href=""
                initial={{ y: 0, skew: 0 }}
                whileHover={{ y: "-3.5%", skew: "1.15deg" }}
                transition={{ duration: 0.075, delay: 0, type: "tween" }}
                onClick={e => handleEmail(e)}>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48" style={{ marginTop: "-0.85rem" }}>
                    <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"></path><path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"></path><polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"></polygon><path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"></path><path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"></path>
                  </svg>
                  <div className="text-[1.25rem]">Email</div>
                </span>
              </motion.a>

              {/* PHONE */}
              <motion.a
                href="(+972)523650974"
                initial={{ y: 0, skew: 0 }}
                whileHover={{ y: "-2.5%", skew: "-1.05deg" }}
                transition={{ duration: 0.075, delay: 0, type: "tween" }}
                onClick={e => handleClick(e, "(+972)523650974", "PHONE")}>
                <span>
                  <svg height="75" width="75" viewBox="0 0 201 201" xmlns="http://www.w3.org/2000/svg">
                    <g id="Layer_1">
                      <rect fill="#2DC100" height="201" rx="19" ry="19" width="201" />
                      <path fill="#FEFEFE" d="M107 34c37 5 54 23 59 60 0 4 0 8 4 8 4 0 4-3 4-6v-2c1-35-30-67-66-68-3 0-9-2-9 4 0 4 5 3 8 4z" />
                      <path fill="#FEFEFE" d="M114 44c-4-1-8-2-9 2-1 6 4 5 8 6 23 5 31 13 35 36v3c0 2 1 5 5 4 2 0 3-1 3-3v-4c0-22-19-42-42-44z" />
                      <path fill="#FEFEFE" d="M116 61c-2 0-5 1-5 3-2 4 1 5 4 5 9 2 14 7 15 16 0 2 1 3 1 4 1 0 2 1 4 1h1c2-1 2-3 2-5 0-11-12-23-22-23z" />
                      <path fill="#FEFEFE" d="M164 134c-5-4-10-7-14-10-10-7-19-7-27 3-4 6-9 7-15 4-17-7-30-19-37-35-1-3-2-5-2-8-1-4 1-8 6-11 4-3 8-6 8-12 0-8-20-34-27-37-3-1-6-1-10 0-18 6-25 21-18 38 4 9 9 18 14 26 22 37 54 64 96 81 3 2 6 2 7 3 12 0 26-11 30-22 3-11-5-15-11-20z" />
                    </g>
                  </svg>
                  <div className="mt-3 text-[1.25rem]">Phone</div>
                </span>
              </motion.a>

              {/* WHATSAPP */}
              <motion.a 
                href="(+972)523650974"
                initial={{ y: 0, skew: 0 }}
                whileHover={{ y: "-3.5%", skew: "-1.65deg" }}
                transition={{ duration: 0.085, delay: 0, type: "tween" }}
                onClick={e => handleClick(e, "(+972)523650974", "WHATSAPP")}>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 187 187" width="75" height="75">
                    <rect fill="#009846" width="187" height="187" rx="18" ry="18" />
                    <path fill="#FEFEFE" d="M95 146c-11 0-22-3-31-9l-21 7 7-20c-6-9-10-20-10-32v-5c3-28 26-50 55-50s52 22 55 51v4c0 30-25 54-55 54zm65-56c-1-35-30-63-65-63S31 54 29 89v3c0 12 4 24 10 33l-12 35 36-11c9 5 20 8 32 8 36 0 65-29 65-65v-2z" />
                    <path fill="#FEFEFE" d="M125 105l-11-5c-1-1-2-1-3 1l-5 6c-1 1-2 1-3 0-2-1-7-2-13-8s-8-9-9-11c-1-1 0-2 0-3l3-3v-2c1-2 1-2 0-3l-5-12c-1-3-2-3-3-3h-3c-1 0-3 1-5 2-1 2-5 6-5 13 0 2 0 4 1 6 1 5 5 10 5 11 1 1 11 18 28 24 16 6 16 4 19 4 3 0 10-4 11-8 1-3 1-7 1-7-1-1-2-1-3-2z" />
                  </svg>
                  <div className="mt-3 text-[1.25rem]">Message</div>
                </span>
              </motion.a>
            </div>
          </div>

          <div className="back-to-site-btn"
            onClick={() => setIsModalOpen(false)}>
                Go back to site ..
          </div>
        </div>
    )
}