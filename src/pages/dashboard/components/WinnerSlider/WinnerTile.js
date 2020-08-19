import React, { useState } from 'react';
import {
  Media,
  Container,
  Row,
  Col
} from 'reactstrap';


import Widget from '../../../../components/Widget/Widget';




const WinnerTile = (props) => {








  return (

    <>
      <Container>









        <div style={{
          position: "relative",
          paddingTop: "20px",
          display: "inline-block",

        }}>


          <div id="card" style={{
            background: "radial-gradient(farthest-side ellipse at 10% 0, " + props.startColor
              + " 20%, " + props.endColor + ")",
            // width: "100%",
            borderRadius: "8px",
            padding: "15px 15px 15px 15px",
            marginLeft: "20px",
            textAlign: "center"


          }}>
            <div className="image-crop" style={{
              display: "block",
              position: "relative",
              backgroundColor: "#E6EBEE",
              width: "80px",
              height: "80px",
              margin: "0 auto",
              overflow: "hidden",
              borderRadius: "50%",
              boxs: "1px 1px 5px #4069E2",
            }}>
              {/* <img id="avatar" src={props.user.avatar} ></img> */}
              <img src="https://images.pexels.com/photos/20787/pexels-photo.jpg" style={{
                height: 80,
                width: 80,
                objectFit: "cover",
                borderRadius: "50%"
              }} alt="" />
            </div>


            <div style={{display:"inline-block"}}>
              <h3 className={"fw-semi-bold"}>{props.user.name}</h3>

              <div id="stats" className="row" style={{ paddingLeft: 5, paddingRight: 5 }}>
                <div className="col">
                  <p className="stat">108</p>
                  <p className="label">Posts</p>
                </div>
                <div className="col">
                  <p className="stat">457</p>
                  <p className="label">Followers</p>
                </div>

              </div>

            </div>
          </div>


          <h5 style={{
            position: "absolute",
            left: "-20px",
            top: "10px",
            marginLeft: "20px",
            background: "radial-gradient(farthest-side ellipse at 10% 0, " + props.startColor
              + " 20%, " + props.endColor + ")",
            textAlign: "center",
            borderRadius: "5px",
            color: "white",
            padding: "8px 6px 6px 6px",
            fontWeight: "600",
            fontSize: "18px}"
          }}>{props.rank}</h5>

        </div>

      </Container>







    </>
  );
}


export default WinnerTile;