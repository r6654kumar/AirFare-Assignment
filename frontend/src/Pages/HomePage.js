import { React, useState } from 'react';
import axios from 'axios';
const HomePage = () => {
    const [origin, setOrigin] = useState('SYD');
    const [destination, setDestination] = useState('JFK');
    const [cabin, setCabin] = useState('Business');
    const [responseData, setResponseData] = useState(null);
    const handleSearch = () => {
        const payload = {
            origin: origin,
            destination: destination,
            cabin: cabin,
        };
        axios.post('https://airfare-assignment-backend.onrender.com/search', payload)
            .then(response => {
                setResponseData(response.data.data);
                console.log(response.data.data)
                if (response.data.data.length === 0) {
                    alert('No Flight found! Try another route.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <>
            <div>
                <div className='mainHeading'>Choose Origin and Destination Airports</div>
                <form class="max-w-sm mx-auto">
                    <label for="origin" class="block mb-2 text-sm font-medium text-white">Choose Origin</label>
                    <select id="origin" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}>
                        <option value="JFK">JFK</option>
                        <option value="DEL">DEL</option>
                        <option value="SYD">SYD</option>
                        <option value="BOM">BOM</option>
                        <option value="BNE">BNE</option>
                        <option value="BLR">BLR</option>
                    </select>
                </form>
                <form class="max-w-sm mx-auto">
                    <label for="destination" class="block mb-2 text-sm font-medium text-white">Choose Destination</label>
                    <select id="destination" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)} >
                        <option value="JFK">JFK</option>
                        <option value="DEL">DEL</option>
                        <option value="SYD">SYD</option>
                        <option value="LHR">LHR</option>
                        <option value="CDG">CDG</option>
                        <option value="DOH">DOH</option>
                        <option value="SIN">SIN</option>
                    </select>
                </form>
                <form class="max-w-sm mx-auto">
                    <label for="cabin" class="block mb-2 text-sm font-medium text-white">Select Cabin</label>
                    <select id="cabin" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={cabin}
                        onChange={(e) => setCabin(e.target.value)} >
                        <option value="Economy">Economy</option>
                        <option value="Business">Business</option>
                        <option value="First">First</option>
                    </select>
                </form>
            </div>
            <div className='max-w-sm mx-auto'>
                <button type="button" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    onClick={handleSearch} >
                    Search
                </button>
            </div>

            {responseData  && (
                <div class="grid grid-cols-2">
                    {responseData.map((item, index) => (
                        <div class="max-w-sm mx-auto rounded-lg shadow bg-gray-800 border-gray-700 p-10" key={index}>
                            <img class="rounded-full w-24 h-24 mx-auto mb-4" src="https://uploads.turbologo.com/uploads/design/preview_image/3442576/preview_image20210311-18137-1wowvo7.png" alt="logo" />
                            <p class="mb-3 text-gray-400 text-xl text-center">{item.partner_program}</p>
                            <p class=" text-gray-400 text-center">{origin}{"->"}{destination}</p>
                            <p class="mb-5 text-gray-400 text-center">{new Date().toLocaleDateString()}{" - "}{new Date(Date.now() + 86400000).toLocaleDateString()}</p>
                            <div class="flex justify-center items-center ">
                                <p class="text-white text-2xl m-0">{item.min_business_miles || 'N/A'}</p>
                                {item.min_business_miles && <p class="text-white text-sm m-0">{"+"} {"$"}{item.min_business_tax}</p>}
                            </div>
                            <p class="mb-3 text-gray-400 mb-5 text-center">Min Business Miles</p>
                            <div class="flex justify-center items-center">
                                <p class="text-white text-2xl m-0">{item.min_economy_miles || 'N/A'}</p>
                                {item.min_economy_miles && <p class="text-white text-sm m-0">{"+"} {"$"}{item.min_economy_tax}</p>}
                            </div>
                            <p class="mb-3 text-gray-400 mb-5 text-center">Min Economy Miles</p>
                            <div class="flex justify-center items-center">
                                <p class="text-white text-2xl m-0">{item.min_first_miles || 'N/A'}</p>
                                {item.min_first_miles && <p class="text-white text-sm m-0">{"+"} {"$"}{item.min_first_tax}</p>}
                            </div>
                            <p class="mb-3 text-gray-400 text-center">Min First Miles</p>
                        </div>
                    ))}
                </div>

            )}
        </>
    );
};
export default HomePage