import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import "./App.css"
import Logo from "./assets/logo.svg"

export default function App() {
  const [devName, setdevName] = useState("")
  const [devObj, setDevObj] = useState({})

  const { register, handleSubmit } = useForm()
  const onSubmit = (devData) => setdevName(devData.devName)

  const fetchData = () => {
    fetch(`https://api.github.com/users/${devName}`)
      .then((response) => {
        return response.json()
      })
      .then((responseJson) => {
        setDevObj(responseJson)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  useEffect(() => {
    fetchData()
  }, [devName])

  return (
    <div className="wrapper">
      <div className="container">
        <header>
          <h1>GOTHUB</h1>
          <div>
            <img className="themeChange" src={Logo} alt="logo" />
          </div>
        </header>
        <main>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Start Typing..."
              {...register("devName", {
                required: true,
              })}
            />
            <div className="bgSubmit">
              <button className="submitBtn" type="submit">
                Search
              </button>
            </div>
          </form>
          {devObj.id ? (
            <div className="userData">
              <h2>{devObj.name || "'No Name'"}</h2>
              <div>
                <img
                  className="devAvatar"
                  src={devObj.avatar_url}
                  alt={devObj.name}
                />
              </div>
              {devObj.location && <h3>{devObj.location}</h3>}
              <h3>Joined: {new Date(devObj.created_at).toDateString()}</h3>

              <a href={devObj.html_url} target="_blank">
                @{devObj.login}
              </a>
              {devObj.twitter_username && (
                <a
                  href={`https://twitter.com/${devObj.twitter_username}`}
                  target="_blank"
                >
                  @{devObj.twitter_username}
                </a>
              )}
              {devObj.blog && (
                <a href={devObj.blog} target="_blank">
                  Website
                </a>
              )}
              <h4>Public Repo: {devObj.public_repos}</h4>
              <h4>Followers: {devObj.followers}</h4>
              <h4>Following: {devObj.following}</h4>
            </div>
          ) : (
            <div className="noUser">
              <h2>{devName ? "No User Found" : "In search of Devs"}</h2>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
