import NotificationList from './components/NotificationList.tsx';
import AddNotification from './components/AddNotification.tsx';

const App = () => {
  return (
    <div className={'mt-8 w-[90%] max-w-2xl mx-auto space-y-14'}>
      <h1 className={'text-center text-5xl font-bold'}>MV1-2 봇 알림</h1>
      <AddNotification />
      <NotificationList />
    </div>
  );
};

export default App;
