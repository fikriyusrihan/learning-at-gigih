import Window from '../../components/Window';
import Navbar from '../../components/Navbar';
import Card from '../../components/Card';
import TabContainer from '../../components/TabContainer';
import TabWindow from '../../components/TabWindow';
import Search from './Search';
import Recommendation from './Recommendation';
import Playlist from './Playlist';

export default function Index() {
  const tabItems = [
    {
      id: 'search',
      title: 'Search',
    },
    {
      id: 'recommendation',
      title: 'Recommendation',
    },
    {
      id: 'playlist',
      title: 'Playlist',
    },
  ]

  return (
    <Window style={{
      marginBottom: '32px',
    }}>
      <Navbar/>

      <Card style={{
        margin: '0 16px',
      }}>
        <h1 style={{
          margin: '0',
        }}>
          Welcome back! (*/ω＼*)
        </h1>

        <p style={{
          marginTop: '8px',
          marginBottom: '48px',
        }}>
          What do you want to listen today?
        </p>

        <TabContainer tabItems={tabItems}>
          <TabWindow key='search'>
            <Search/>
          </TabWindow>

          <TabWindow key='recommendation'>
            <Recommendation/>
          </TabWindow>

          <TabWindow key='playlist'>
            <Playlist/>
          </TabWindow>
        </TabContainer>
      </Card>
    </Window>
  );
}