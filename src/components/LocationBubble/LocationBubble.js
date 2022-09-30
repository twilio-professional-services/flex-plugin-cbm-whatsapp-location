import { useFlexSelector, TaskHelper } from '@twilio/flex-ui'

const LocationBubble = props => {
  console.log('props.task')
  console.log(props)
  const task = TaskHelper.getTaskFromConversationSid(props.conversationSid)

  const data = useFlexSelector(
    state =>
      state.flex?.view?.componentViewStates?.['WhatsAppMapData']?.[task.sid] ||
      null
  )

  if (data && props.message.source.body === '') {
    return <div>You received a location from the WhatsApp user</div>
  }

  return null
}

export default LocationBubble
