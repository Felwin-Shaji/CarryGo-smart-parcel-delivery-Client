import toast from "react-hot-toast";
import { useAxios } from "../hooks/useAxios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin, userLogout } from "../store/Slice/userSlice";
import { adminLogin, adminLogout } from "../store/Slice/adminSlice";
import { agencyLogin, agencyLogout } from "../store/Slice/agencySlice";
import { ROLES, type Roles } from "../constants_Types/types/roles";
import { API_AUTH } from "../constants_Types/apiRoutes";
import { hubLogin, hubLogout } from "../store/Slice/hubSlice";
import { workerLogin, workerLogout } from "../store/Slice/workerSlice";

export const useAuth = () => {
  const axiosInstance = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();





  /**
 * Handles user registration (Step 1 — Send OTP)
 *
 * @param data {{
 *   name: string;
 *   email: string;
 *   mobile: string;
 *   password: string;
 * }}
 *
 * @returns Promise<void>
 */
  const handleRegistration = async (data: {
    name: string;
    email: string;
    mobile: string;
    password: string;
  }) => {
    try {
      const response = await axiosInstance.post(API_AUTH.SEND_OTP, data);

      if (response.data?.success) {
        toast.success(response.data?.message || "OTP sent successfully");

        const otpData = {
          email: response.data.email,
          role: response.data.role,
          expiresAt: response.data.expiresAt,
        };

        localStorage.setItem("otpMeta", JSON.stringify(otpData));

        switch (otpData.role) {
          case "user":
            navigate("/verify-otp");
            break;

          case "agency":
            navigate("/agency/verify-otp");
            break;
          default:
            console.warn("Unknown role received during registration:", otpData.role);
            navigate("/verify-otp");
        }


      } else {
        toast.error(response.data?.error || "Failed to send OTP");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.response?.data?.error || "Something went wrong!");
    }
  };


  /**
 * Verifies OTP during registration flow
 *
 * @param data {{
 *   email: string;
 *   otp: string;
 *   role: string;
 * }}
 *
 * @returns Promise<{ success: boolean }>
 */
  const handleVerifyOtp = async (data: { email: string; otp: string; role: string }) => {
    try {
      const response = await axiosInstance.post(API_AUTH.VERIFY_OTP, data);

      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid OTP");
      return { success: false };
    }
  };



  /**
   * Resends OTP for registration process
   *
   * @param data {{
   *   email: string;
   *   role: string;
   * }}
   *
   * @returns Promise<{ success: boolean; expiresAt: string }>
   */
  const handleResendOtp = async (data: { email: string; role: string }) => {
    try {
      const response = await axiosInstance.post(API_AUTH.SEND_OTP, {
        ...data,
        isResend: true,
      });

      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Resend failed");
      return { success: false };
    }
  };



  /**
   * Logs out the user/admin/agency/hub and clears Redux state.
   *
   * @param role - Current logged-in user role
   * @param userId - Unique identifier of the user to log out
   *
   * @returns Promise<void>
   */
  const handleLogoutt = async (role: string, userId: string) => {
    try {
      const response = await axiosInstance.post(API_AUTH.LOGOUT, { role, userId });
      if (response.data.success) {
        if (role === ROLES.USER) {
          dispatch(userLogout());
          navigate("/login");
        } else if (role === ROLES.ADMIN) {
          dispatch(adminLogout());
          navigate("/admin/login");
        } else if (role === ROLES.AGENCY) {

          dispatch(agencyLogout());
          navigate("/agency/login");
        } else if (role === ROLES.HUB) {
          dispatch(hubLogout());
          navigate('/hub/login')
        } else if (role === ROLES.WORKER) {
          dispatch(workerLogout());
          navigate('/worker/login')
        }
        toast.success("Logged out successfully");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };


  /**
 * Handles login for all roles (User, Admin, Agency, Hub)
 *
 * @param data {{
 *   email: string;
 *   password: string;
 *   role: string;
 * }}
 *
 * @returns Promise<void>
 */
  const handleLogin = async (data: { email: string; password: string; role: string }) => {
    try {
      const response = await axiosInstance.post(API_AUTH.LOGIN, data);

      if (response.data?.success) {
        toast.success(response.data.message || "Login successful");

        if (data.role === ROLES.USER) {
          dispatch(userLogin(response.data));
          navigate("/home");
        } else if (data.role === ROLES.ADMIN) {
          dispatch(adminLogin({
            admin: response.data.user,
            accessToken: response.data.user.accessToken,
          }));
          navigate("/admin/dashboard");
        } else if (data.role === ROLES.AGENCY) {
          dispatch(agencyLogin({
            agency: response.data.user,
            accessToken: response.data.user.accessToken
          }))
          navigate("/agency/dashboard");
        } else if (data.role === ROLES.HUB) {
          dispatch(hubLogin({
            hub: response.data.user,
            accessToken: response.data.user.accessToken
          }))
          navigate("/hub/dashboard")
        } else if (data.role === ROLES.WORKER) {
          dispatch(workerLogin({
            worker: response.data.user,
            accessToken: response.data.user.accessToken
          }))
          navigate("/worker/dashboard")
        }
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed!");
    }
  };




  /**
   * Sends password reset link to the user's registered email.
   *
   * @param data {{
   *   email: string;
   *   role: Roles;
   * }}
   *
   * @returns Promise<void>
   */
  const handleForgotPassword = async (data: { email: string, role: Roles }) => {
    try {
      const response = await axiosInstance.post(API_AUTH.FORGOT_PASSWORD, data);

      if (response.data?.success) {
        toast.success(response.data.message || "Reset link sent to your email");
        navigate("/reset-link-sent");
      } else {
        toast.error(response.data.message || "Failed to send reset link");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  }


  /**
 * Resets the user's password using the token from email.
 *
 * @param token - Secure token sent via email
 * @param data {{
 *   password: string;
 *   role: Roles;
 * }}
 *
 * @returns Promise<void>
 */
  const handleResetPassword = async (token: string, data: { password: string, role: Roles }) => {
    try {
      const response = await axiosInstance.post(`${API_AUTH.RESET_PASSWORD}/${token}`, data);

      if (response.data?.success) {
        toast.success("Password reset successfully");
        switch (data.role) {
          case ROLES.USER:
            navigate("/login");
            break;
          case ROLES.ADMIN:
            navigate("/admin/login");
            break;
          case ROLES.AGENCY:
            navigate("/agency/login");
            break;
          case ROLES.HUB:
            navigate("/hub/login");
            break;
          case ROLES.WORKER:
            navigate("/worker/login");
            break;
          default:
            navigate("/login");
        }

      } else {
        toast.error(response.data.message || "Reset failed");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  }

  return { handleRegistration, handleLogin, handleLogoutt, handleForgotPassword, handleResetPassword, handleVerifyOtp, handleResendOtp };
};
