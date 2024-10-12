import React from "react";  
import { getByTestId, render, screen, waitFor } from "@testing-library/react";
import FollowersList from '../FollowersList'
import { MemoryRouter } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { mockData } from "../../../__mock__/axios";

// import axios from "axios";
// import { data } from "../../../data/data";

// const mockData={
//     data:{
//         results:[
//             {
//                 name: {
//                     title: "Mr",
//                     first: "Pedro",
//                     last: "Vasquez"
//                 },
//                 picture: {
//                     large: "https://randomuser.me/api/portraits/men/94.jpg",
//                     medium: "https://randomuser.me/api/portraits/med/men/94.jpg",
//                     thumbnail: "https://randomuser.me/api/portraits/thumb/men/94.jpg"
//                 },
//                 login: {
//                     uuid: "ce439bed-437e-4d5a-9917-dcbfbd3a1136",
//                     username: "beautifulkoala831",
//                     password: "miracle",
//                     salt: "rpB41wPL",
//                     md5: "937c3838deb6d4642f3097da4cd21648",
//                     sha1: "e9f93f024f52a8d10cb1cf4dac8cef17bf1f7790",
//                     sha256: "1090c982e28183fb6ac2c242d54b2ae9c868ebd8b4616ef19b83bd9e033f0f07"
//                 },
//             }
//         ]
//     }
// }

const MockFollowersList=()=>{
    return <MemoryRouter>
        <FollowersList/>
    </MemoryRouter>
}

jest.mock('axios');
describe('Followers List', () => {

    beforeAll(()=>{
        console.log("Running before all ");
    })

    beforeEach(()=>{
        console.log("Running before each");
    })

    afterEach(()=>{
        console.log("running after each test")
    })

    afterAll(()=>{
        console.log("Running after all");
    })

    describe('Render Method', () => {
        it('Test single Follower', async () => {
            axios.get.mockResolvedValue(mockData)
        
            const {findByTestId} = render(<MockFollowersList/>);
            const divElement = await findByTestId("follower-item-0");
            expect(divElement).toBeInTheDocument()
        });



        it('Test All Follower', async () => {
            axios.get.mockResolvedValue(mockData)
            const {findAllByTestId} = render(<MockFollowersList/>);
            const divElement = await findAllByTestId(/follower-item/i); 
            expect(divElement.length).toBe(1);
        });
        
    });
    
});
