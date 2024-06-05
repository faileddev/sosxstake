import Image from "next/image";
import styles from "./page.module.css";
import { Login } from "../../components/Login";
import { Susdt } from "../../components/Susdt";

export default function Home() {
  return (
    <div
    style={{
      display: "flex",
      justifyContent: "center",
      padding: "20px",
      height: "100vh",
      width: "100vw"
    }}>
      
      <div>
        <div style={{
          padding: "10px"
        }}>
          <h1>
          SOS-VAULTS
                </h1>
                <p style={{
                  marginTop: "10px"
                }}>
          Deposit your sosTOKENS to earn a share of the protocol revenue.
                </p>
        </div>
        <div>
          <Login/>
          
        </div>

        <div style={{
          marginTop: "10px",
          marginBottom: "20px"
        }}>
          <Susdt />
        </div>
        
        <div>
          
        </div>
      </div>
    </div>
  );
}
