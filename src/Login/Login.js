// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";
// // import Navbar from "../Navbar/Navbar";
// import "./Login.css";

// const Login = () => {
//   const navigate = useNavigate();

//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // const handleLogin = (e) => {
//   //   e.preventDefault();

//   //   setError("");
//   //   setLoading(true);

//   //   // ADMIN PASSWORD
//   //   if (password === "niss123") {
//   //     localStorage.setItem("isLoggedIn", "true");
//   //     localStorage.setItem("adminLoggedIn", "true");

//   //     // Go to Admin Dashboard
//   //     navigate("/dashboard");
//   //   } else {
//   //     setError("Invalid Admin Password ❌");
//   //     setLoading(false);
//   //   }
//   // };

//   const handleLogin = async (e) => {
//   e.preventDefault();

//   try {
//     await signInWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );

//     localStorage.setItem("isLoggedIn", "true");
//     localStorage.setItem("adminLoggedIn", "true");

//     navigate("/dashboard");

//   } catch (error) {
//     console.error("Login Error:", error);
//     alert("Invalid email or password");
//   }
// };

//   return (
//     <div className="niss-admin-login-page">

//       {/* <Navbar /> */}

//       {/* BACKGROUND VIDEO */}
//       <video
//         className="niss-admin-login-video"
//         autoPlay
//         muted
//         loop
//         playsInline
//       >
//         <source
//           src="/videos/marvv96.mp4"
//           type="video/mp4"
//         />
//       </video>

//       {/* OVERLAY */}
//       <div className="niss-admin-login-overlay"></div>

//       {/* MAIN */}
//       <main className="niss-admin-login-container">

//         {/* LEFT */}
//         <section className="niss-admin-login-info">

//           <span className="niss-admin-login-badge">
//             NISS TECHNOLOGIES
//           </span>

//           <h1>
//             Welcome To
//             <span> Admin Panel</span>
//           </h1>

//           <p>
//             Securely manage your customers, enquiries,
//             projects, contacts and business records
//             from one powerful administration dashboard.
//           </p>

//           <div className="niss-admin-login-features">

//             <div className="niss-admin-feature">
//               <span>📊</span>
//               <div>
//                 <strong>Business Dashboard</strong>
//                 <small>
//                   Manage your complete business data
//                 </small>
//               </div>
//             </div>

//             <div className="niss-admin-feature">
//               <span>👥</span>
//               <div>
//                 <strong>Customer Management</strong>
//                 <small>
//                   View customer enquiries and orders
//                 </small>
//               </div>
//             </div>

//             <div className="niss-admin-feature">
//               <span>🔐</span>
//               <div>
//                 <strong>Secure Admin Access</strong>
//                 <small>
//                   Restricted access for administration
//                 </small>
//               </div>
//             </div>

//           </div>

//         </section>

//         {/* RIGHT LOGIN CARD */}
//         <section className="niss-admin-login-card">

//           <div className="niss-admin-login-icon">
//             🔐
//           </div>

//           <h2>Admin Login</h2>

//           <p className="niss-admin-login-subtitle">
//             Sign in to access your company dashboard
//           </p>

//           <form onSubmit={handleLogin}>

//             <div className="niss-admin-input-group">

//               <label>
//                 Admin Password
//               </label>

//               <div className="niss-admin-password-box">

//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => {
//                     setPassword(e.target.value);
//                     setError("");
//                   }}
//                   placeholder="Enter admin password"
//                   required
//                   autoComplete="current-password"
//                 />

//                 <button
//                   type="button"
//                   className="niss-admin-show-password"
//                   onClick={() =>
//                     setShowPassword(!showPassword)
//                   }
//                 >
//                   {showPassword ? "🙈" : "👁️"}
//                 </button>

//               </div>

//             </div>

//             {error && (
//               <div className="niss-admin-login-error">
//                 {error}
//               </div>
//             )}

//             <button
//               type="submit"
//               className="niss-admin-login-button"
//               disabled={loading}
//             >
//               {loading
//                 ? "Opening Dashboard..."
//                 : "Login to Admin Panel →"}
//             </button>

//           </form>

//           <div className="niss-admin-login-footer">
//             <span>🔒</span>
//             Authorized company administration only
//           </div>

//         </section>

//       </main>

//     </div>
//   );
// };

// export default Login;




// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";
// import "./Login.css";

// const Login = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     setError("");
//     setLoading(true);

//     try {
//       await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );

//       localStorage.setItem("isLoggedIn", "true");
//       localStorage.setItem("adminLoggedIn", "true");

//       navigate("/dashboard");

//     } catch (error) {
//       console.error("Login Error:", error);

//       if (error.code === "auth/invalid-credential") {
//         setError("Invalid email or password ❌");
//       } else if (error.code === "auth/invalid-email") {
//         setError("Please enter a valid email address ❌");
//       } else if (error.code === "auth/too-many-requests") {
//         setError("Too many attempts. Please try again later ❌");
//       } else {
//         setError("Login failed. Please try again ❌");
//       }

//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="niss-admin-login-page">

//       {/* BACKGROUND VIDEO */}
//       <video
//         className="niss-admin-login-video"
//         autoPlay
//         muted
//         loop
//         playsInline
//       >
//         <source
//           src="/videos/marvv96.mp4"
//           type="video/mp4"
//         />
//       </video>

//       {/* OVERLAY */}
//       <div className="niss-admin-login-overlay"></div>

//       {/* MAIN */}
//       <main className="niss-admin-login-container">

//         {/* LEFT SECTION */}
//         <section className="niss-admin-login-info">

//           <span className="niss-admin-login-badge">
//             NISS TECHNOLOGIES
//           </span>

//           <h1>
//             Welcome To
//             <span> Admin Panel</span>
//           </h1>

//           <p>
//             Securely manage your customers, enquiries,
//             projects, contacts and business records
//             from one powerful administration dashboard.
//           </p>

//           <div className="niss-admin-login-features">

//             <div className="niss-admin-feature">
//               <span>📊</span>

//               <div>
//                 <strong>Business Dashboard</strong>

//                 <small>
//                   Manage your complete business data
//                 </small>
//               </div>
//             </div>

//             <div className="niss-admin-feature">
//               <span>👥</span>

//               <div>
//                 <strong>Customer Management</strong>

//                 <small>
//                   View customer enquiries and orders
//                 </small>
//               </div>
//             </div>

//             <div className="niss-admin-feature">
//               <span>🔐</span>

//               <div>
//                 <strong>Secure Admin Access</strong>

//                 <small>
//                   Restricted access for administration
//                 </small>
//               </div>
//             </div>

//           </div>

//         </section>

//         {/* RIGHT LOGIN CARD */}
//         <section className="niss-admin-login-card">

//           <div className="niss-admin-login-icon">
//             🔐
//           </div>

//           <h2>Admin Login</h2>

//           <p className="niss-admin-login-subtitle">
//             Sign in to access your company dashboard
//           </p>

//           <form onSubmit={handleLogin}>

//             {/* EMAIL INPUT */}
//             <div className="niss-admin-input-group">

//               <label>
//                 Admin Email
//               </label>

//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => {
//                   setEmail(e.target.value);
//                   setError("");
//                 }}
//                 placeholder="Enter admin email"
//                 required
//                 autoComplete="email"
//               />

//             </div>

//             {/* PASSWORD INPUT */}
//             <div className="niss-admin-input-group">

//               <label>
//                 Admin Password
//               </label>

//               <div className="niss-admin-password-box">

//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => {
//                     setPassword(e.target.value);
//                     setError("");
//                   }}
//                   placeholder="Enter admin password"
//                   required
//                   autoComplete="current-password"
//                 />

//                 <button
//                   type="button"
//                   className="niss-admin-show-password"
//                   onClick={() =>
//                     setShowPassword(!showPassword)
//                   }
//                 >
//                   {showPassword ? "🙈" : "👁️"}
//                 </button>

//               </div>

//             </div>

//             {/* ERROR MESSAGE */}
//             {error && (
//               <div className="niss-admin-login-error">
//                 {error}
//               </div>
//             )}

//             {/* LOGIN BUTTON */}
//             <button
//               type="submit"
//               className="niss-admin-login-button"
//               disabled={loading}
//             >
//               {loading
//                 ? "Opening Dashboard..."
//                 : "Login to Admin Panel →"}
//             </button>

//           </form>

//           <div className="niss-admin-login-footer">
//             <span>🔒</span>
//             Authorized company administration only
//           </div>

//         </section>

//       </main>

//     </div>
//   );
// };

// export default Login;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("adminLoggedIn", "true");

      navigate("/dashboard");

    } catch (error) {
      console.error("Login Error Code:", error.code);
      console.error("Login Error Message:", error.message);

      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        setError("Email या Password गलत है ❌");

      } else if (error.code === "auth/invalid-email") {
        setError("Email सही नहीं है ❌");

      } else if (error.code === "auth/too-many-requests") {
        setError("बहुत ज्यादा प्रयास हुए हैं। बाद में कोशिश करें ❌");

      } else if (error.code === "auth/operation-not-allowed") {
        setError(
          "Firebase में Email/Password Login enabled नहीं है ❌"
        );

      } else {
        setError(`${error.code}: ${error.message}`);
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="niss-admin-login-page">

      {/* BACKGROUND VIDEO */}
      <video
        className="niss-admin-login-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src="/videos/marvv96.mp4"
          type="video/mp4"
        />
      </video>

      {/* OVERLAY */}
      <div className="niss-admin-login-overlay"></div>

      {/* MAIN */}
      <main className="niss-admin-login-container">

        {/* LEFT SECTION */}
        <section className="niss-admin-login-info">

          <span className="niss-admin-login-badge">
            NISS TECHNOLOGIES
          </span>

          <h1>
            Welcome To
            <span> Admin Panel</span>
          </h1>

          <p>
            Securely manage your customers, enquiries,
            projects, contacts and business records
            from one powerful administration dashboard.
          </p>

          <div className="niss-admin-login-features">

            <div className="niss-admin-feature">
              <span>📊</span>

              <div>
                <strong>Business Dashboard</strong>

                <small>
                  Manage your complete business data
                </small>
              </div>
            </div>

            <div className="niss-admin-feature">
              <span>👥</span>

              <div>
                <strong>Customer Management</strong>

                <small>
                  View customer enquiries and orders
                </small>
              </div>
            </div>

            <div className="niss-admin-feature">
              <span>🔐</span>

              <div>
                <strong>Secure Admin Access</strong>

                <small>
                  Restricted access for administration
                </small>
              </div>
            </div>

          </div>

        </section>

        {/* RIGHT LOGIN CARD */}
        <section className="niss-admin-login-card">

          <div className="niss-admin-login-icon">
            🔐
          </div>

          <h2>Admin Login</h2>

          <p className="niss-admin-login-subtitle">
            Sign in to access your company dashboard
          </p>

          <form onSubmit={handleLogin}>

            {/* EMAIL INPUT */}
            <div className="niss-admin-input-group">

              <label>
                Admin Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="Enter admin email"
                required
                autoComplete="email"
              />

            </div>

            {/* PASSWORD INPUT */}
            <div className="niss-admin-input-group">

              <label>
                Admin Password
              </label>

              <div className="niss-admin-password-box">

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter admin password"
                  required
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="niss-admin-show-password"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>

              </div>

            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="niss-admin-login-error">
                {error}
              </div>
            )}

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="niss-admin-login-button"
              disabled={loading}
            >
              {loading
                ? "Opening Dashboard..."
                : "Login to Admin Panel →"}
            </button>

          </form>

          <div className="niss-admin-login-footer">
            <span>🔒</span>
            Authorized company administration only
          </div>

        </section>

      </main>

    </div>
  );
};

export default Login;