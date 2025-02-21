import { isDev } from 'utils'
import './ReloadPrompt.css'
import { useRegisterSW } from 'virtual:pwa-register/react'

function ReloadPrompt() {
  // replaced dynamically
  const buildDate = '__DATE__'
  // replaced dyanmicaly
  const reloadSW = isDev()? 'true': '__RELOAD_SW__'


  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      if (reloadSW === 'true') {
        console.log('starting interval');
        r && setInterval(() => {
          r.update()
        }, 20000 /* 20s for testing purposes */)
      }
    },
    onRegisterError(error) {
      console.log('SW registration error', error)
    },
  })

  const close = () => {
    setOfflineReady(false)
    setNeedRefresh(false)
  }

  return (
    <div className="ReloadPrompt-container">
      { (offlineReady || needRefresh)
      && (
        <div className="ReloadPrompt-toast">
          <div className="ReloadPrompt-toast-message">
            { offlineReady
              ? <span>App ready to work offline</span>
              : <span>New version available.</span>}
          </div>
          { needRefresh && <button className="ReloadPrompt-toast-button" onClick={() => updateServiceWorker(true)}>Update</button> }
          <button className="ReloadPrompt-toast-button" onClick={() => close()}>Close</button>
        </div>
      )}
      <div className="ReloadPrompt-date">{buildDate}</div>
    </div>
  )
}

export default ReloadPrompt
