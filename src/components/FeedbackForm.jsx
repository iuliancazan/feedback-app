import { useState, useContext, useEffect } from "react"
import RatingSelect from "./RatingSelect"
import Card from "./shared/Card"
import Button from "./shared/Button"
import FeedbackContext from "../context/FeedbackContext"

function FeedbackForm() {
  const [text, setText] = useState('')
  const [rating, setRating] = useState()
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message1, setMessage1] = useState('')
  const [message2, setMessage2] = useState('')

  const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext)

  useEffect (() => {
    if(rating === undefined) {
      setMessage2('Please select a rating.')
    } else {
      setMessage2('')
    }
  }, [rating])

  useEffect (() => {
    if(feedbackEdit.edit === true) {
      setBtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    }
  }, [feedbackEdit])

  const handleTextChange = (e) => {
    console.log(typeof rating, rating)
    
    if(text === '' ) {
      setBtnDisabled(true)
      setMessage1(null)
    } else if (text !== '' && text.trim().length <= 5) {
      setBtnDisabled(true)
      setMessage1('Text must be at least 5 characters.')
    } else {
      setMessage1(null)
      setBtnDisabled(false)
    }
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(rating === undefined) {
      setMessage2('Please select a rating.')
    } else {
      if(text.trim().length > 5) {
        const newFeedback = {
          text,
          rating
        }
        if(feedbackEdit.edit === true) {
          updateFeedback(feedbackEdit.item.id, newFeedback)
        } else {
          addFeedback(newFeedback)
        }
        setText('')
      }
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input 
            onChange={handleTextChange} 
            type="text" 
            placeholder='Write a review'
            value={text} 
            />
          <Button type="submit" isDisabled={btnDisabled}>{feedbackEdit.edit ? 'Update' : 'Send'}</Button>
        </div>

        {message1 && <div className="message">{message1}</div>}
        {message2 && <div className="message">{message2}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm