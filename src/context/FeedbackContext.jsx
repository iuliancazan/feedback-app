import { createContext, useState } from "react"
import { v4 as uuidv4 } from 'uuid'


const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'This item is from the context.',
      rating: 10
    },
    {
      id: 2,
      text: 'This other item is from the context too.',
      rating: 5    }
  ])
  const [ feedbackEdit, setFeedbackEdit ] = useState({
    item: {},
    edit: false
  })

  const [selectedRating, setSelectedRating] = useState()

  // Add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }

  // Delete feedback
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  // Update feedback item
  const updateFeedback = (id, updItem) => {
    // console.log(id, updItem)
    setFeedback(feedback.map((item) => item.id === id ? { ...item, ...updItem} : item))
    setFeedbackEdit({
      item: {rating: 10},
      edit: false
    })
  }

  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  return <FeedbackContext.Provider value={{
    feedback,
    feedbackEdit,
    selectedRating,
    deleteFeedback,
    addFeedback,
    editFeedback,
    updateFeedback,
  }}>
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext
