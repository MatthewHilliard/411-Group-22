import logo from '../assets/forkandknife.png'
import menu_bar from '../assets/menu_bar.png'
import profile_photo from '../assets/profile.png'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Axios from 'axios'


function NavBar({ setSearchMealsList }) {
    // navigate : used to redirect user to other urls...
    const navigate = useNavigate()

    // create and maintain "searchString" within searchbar
    const [searchString, setSearchString] = useState("")

    // handleChange : update "searchString" for each keypress in searchbar
    function handleChange(event) {
        const { value } = event.target
        setSearchString(value)
    }

    // handleKeyDown : grabs keyboard symbol that user entered (check for 'Enter')
    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            search()
        }
    }

    // make request to backend for search
    function search() {
        //console.log(searchString) question: when it hits "enter" it does not reflect this change for handleChange?
        const body = {
            searchString
        }
        try {
            Axios.post("http://localhost:3000/search/meals", body).then((response) => {
                // parse response data from JSON to a newly created javascript object, where the keys turn into attributes and the values turn into the value of those attributes
                const data = JSON.parse(response.data)

                // obtain array of results from api call. Results is an attribute of the newly created object
                const results = data.results

                // map each item to a meal (and reassign searchMealsList)

                // reassign searchMealsList
                setSearchMealsList(results)

                // redirect to the search results page
                navigate('/search-results')
            })
        } catch (error) {
            console.log("Error fetching data from backend:", error)
        }
    }

    return (
        <div className="flex flex-row mx-auto my-auto overflow-hidden">

            {/* Makes everything within this Link container a href, which points to the home route of pathname "/" */}
            <Link to="/">
                <div className='flex items-center flex-shrink-0'>
                    <img className='h-16 py-2 px-2' src={logo} />
                    <h1 className="py-3 text-4xl font-light">Meal Planner</h1>
                </div>
            </Link>

            <div className="ml-5 mr-5 mt-2 w-[350px]"> {/* NOT COMMENT: Can change the placement as needed*/}
                {/* Creates the input box of type "search", updates searchString by calling handleChange & sees if "enter" is pressed */}
                <input
                    type="search"
                    placeholder="What would you like to eat today?"
                    className="w-full p-4 rounded-full focus:outline-none"
                    name="searchbar"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
            </div>

            <div className='flex items-center ml-auto mr-5 flex-shrink-0'>

                <button className=''>
                    {/* Makes everything within this Link container a href, which points to the login route of pathname "/login" */}
                    <Link to="/login"><img className='h-10' src={profile_photo} /></Link>
                </button>

                {/* menu bar button */}
                {/* UNDER CONSTRUCTION */}
                <button className='ml-5'> {/* NOT COMMENT: Adjust the ml-2 (margin-left) as needed */}
                    <img className='h-12' src={menu_bar} />
                </button>
            </div>
        </div>
    )
}

export default NavBar