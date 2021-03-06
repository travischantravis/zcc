import React, {useState, useEffect} from 'react'
import TicketRow from './TicketRow'
import Error from "./Error";


function Home() {
  const [tickets, setTickets] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [curPageCount, setCurPageCount] = useState(0);
  const [pagination, setPagination] = useState();
  const [hasMore, setHasMore] = useState(false)
  const [errMsg, setErrorMsg] = useState("");
  const [totalPage, setTotalPage] = useState(0) // start at zero
  const [curPage, setCurPage] = useState(0); // start at zero
  const pageSize = 25
  
  useEffect(() => {
    fetch("/api/tickets")
      .then(res => {
        return res.json()
      })
      .then(json => {
        console.log("Zendesk", json);
        if(json.error){
          setErrorMsg(json.error)
        }else{       
          setTickets(json.tickets.tickets)
          setTotalCount(json.count.count.value)
          setCurPageCount(json.tickets.tickets.length)
          setPagination({after: json.tickets.meta.after_cursor, before: json.tickets.meta.before_cursor})
          setHasMore(json.tickets.meta.has_more)
          setTotalPage(Math.ceil(json.count.count.value / pageSize))
          setCurPage(0);
          setErrorMsg("")
        }
      })
      .catch(err=>{
        setErrorMsg(err)
      })


    // Specify how to clean up after this effect:
    return () => {};
  }, []);

  function onPrevBtnClick(){

    fetch(`/api/tickets/prev?before=${pagination.before}`)
      .then(res => {
        return res.json()
      })
      .then(json => {
        setTickets(json.tickets.tickets)
        setCurPageCount(json.tickets.tickets.length)
        setPagination({after: json.tickets.meta.after_cursor, before: json.tickets.meta.before_cursor})
        setHasMore(json.tickets.meta.has_more)
        setCurPage(curPage-1)
        setErrorMsg("")
      })
      .catch(err=>{
        setErrorMsg(err)
      })
  }

  function onNextBtnClick(){

    fetch(`/api/tickets/next?after=${pagination.after}`)
      .then(res => {
        return res.json()
      })
      .then(json => {
        setTickets(json.tickets.tickets)
        setCurPageCount(json.tickets.tickets.length)
        setPagination({after: json.tickets.meta.after_cursor, before: json.tickets.meta.before_cursor})
        setHasMore(json.tickets.meta.has_more)
        setCurPage(curPage+1)
        setErrorMsg("")
      })
      .catch(err=>{
        setErrorMsg(err)
      })
  }


  return (
    <div>
      {errMsg === "" ?  
        <div>
          <p>Total tickets: {totalCount}</p>
          <p>Tickets on this page: {curPageCount}</p>
          <button onClick={onPrevBtnClick} disabled={curPage === 0}>Prev Page</button>
          <button onClick={onNextBtnClick} disabled={!hasMore}>Next Page</button>
          {tickets.map((ticket)=>{
            return <TicketRow key={ticket.id} ticket={ticket}/>          
          })}
        </div>
      : 
        <Error errMsg={errMsg}/>}

      
    </div>
  )
}

export default Home
