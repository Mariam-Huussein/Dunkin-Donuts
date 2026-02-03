import { ClipLoader } from "react-spinners";

function SpinnerOverlay({ loading }) {
  if (!loading) return null;

  return (
    <div style={{
      position: "fixed",
      top:0, left:0, width:"100%", height:"100%",
      background:"rgba(255,255,255,0.6)",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      zIndex:9999
    }}>
      <ClipLoader color="#c63663" loading={loading} size={50} />
    </div>
  );
}

export default SpinnerOverlay;
