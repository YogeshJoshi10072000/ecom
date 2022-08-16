import Topbar from "../../components/topbar/topbar";
import Sidebar from "../../components/sidebar/sidebar";
import Feed from "../../components/feed/feed";
import Rightbar from "../../components/right/Rightbar";
import Allpost from "../../components/Allposts/Allpost";
import "./Home.css"

export default function Home() {
  return (
    <>
      <Topbar />
       
       <div className="homeContainer">
       
        <Sidebar />
        <Allpost/>
        <Rightbar/>
      </div> 
    </>
  );
}