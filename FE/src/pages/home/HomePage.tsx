import React from 'react';
import {  Typography, useTheme } from '@mui/material';
import Banner from './Banner';
import MangaCard from '../../components/ui/MangaCard';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import useFetchAll from '../../components/hooks/useFetchAll';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
const HomePage = () => {
  const [value, setValue] = React.useState(0);
  const {data: manga, isLoading, isError, error} = useFetchAll('/stories');
  const theme = useTheme();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const repeated = Array(8).fill(manga).flat();
    return (
        <div >
        <Banner />
        <div className="p-8">
         <div className="flex justify-between items-stretch mx-16 h-full min-h-screen">
  {/* Left Column */}
            <div className="w-1/2 m-4 flex flex-col">
              <Typography variant="h4" className="!mb-8 border-b-4 border-purple-300 inline-block">
                Weekly Spotlight
              </Typography>
              <div className="grid grid-cols-3 grid-rows-2 gap-8 flex-1">
              {repeated.slice(0, 6).map((item: any) => (
                <MangaCard item={item} />
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="w-1/2 m-4 flex flex-col">
              <Typography variant="h4" className="!mb-8 border-b-4 border-purple-300 inline-block">
                New & Trending
              </Typography>
              <div className="flex flex-col grid-cols-5 h-full space-y-0 divide-y">
                {repeated.slice(0, 5).map((item: any) => (
                  <div>
                    <div
                    key={item}
                    className="flex items-center flex-1 p-4"
                  >
                    <img
                      src={item.cover_image}
                      alt="Example"
                      className="w-28 h-32 object-cover rounded-lg mr-4"
                    />
                    <div>
                      <Typography variant="h6" className="font-bold">{item.title}</Typography>
                      <Typography variant="body2" color="textSecondary">4.6m • 74,197</Typography>
                      <div className="flex space-x-2 mt-2">
                        <Box
                        component="span"
                        sx={{
                          bgcolor: theme.palette.mode === "dark" ? "grey.800" : "grey.200",
                          color: "text.primary",
                          px: 1,
                          py: 0.25,
                          borderRadius: 1,
                          fontSize: "0.675rem",
                        }}
                      >
                        Genre
                        </Box>
                        <Box
                        component="span"
                        sx={{
                          bgcolor: theme.palette.mode === "dark" ? "grey.800" : "grey.200",
                          color: "text.primary",
                          px: 1,
                          py: 0.25,
                          borderRadius: 1,
                          fontSize: "0.675rem",
                        }}
                      >
                        Genre
                      </Box>
                      </div>
                    </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
         <div className="p-8">
         
         <div className="flex space-x-4 mb-4">
         <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" indicatorColor="secondary">
          <Tab className='!font-bold' label="Recommended for You" {...a11yProps(0)} />
          <Tab className='!font-bold' label="Popular" {...a11yProps(1)} />
          <Tab className='!font-bold' label="Originals" {...a11yProps(2)} />
          <Tab className='!font-bold' label="What's New" {...a11yProps(3)} />
        </Tabs>
         </div>
         {[0, 1, 2, 3].map((index) => (
          <CustomTabPanel value={value} index={index} key={index}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {repeated.slice(0, 12).map((item, index) => (
              <MangaCard item={item} key={index} />
            ))}
          </div>
          </CustomTabPanel>
        ))}
        </div>
       <div className="mt-8 flex justify-around py-6">
        <div className="text-center bg-gray-200 rounded-lg py-10 px-40 dark:bg-gray-800 dark:text-white">
          <div className="text-2xl font-bold">42.5k</div>
          <div className="text-gray-600 dark:text-gray-300">Creators</div>
        </div>
        <div className="text-center bg-gray-200 rounded-lg py-10 px-40 dark:bg-gray-800 dark:text-white">
          <div className="text-2xl font-bold">16.1k</div>
          <div className="text-gray-600 dark:text-gray-300">Stories Shared</div>
        </div>
        <div className="text-center bg-gray-200 rounded-lg py-10 px-40 dark:bg-gray-800 dark:text-white">
          <div className="text-2xl font-bold">8.9k</div>
          <div className="text-gray-600 dark:text-gray-300">Readers</div>
        </div>
      </div>

         {/* <div className="mt-8 flex justify-around">
           <Button variant="contained" color="primary" className="bg-red-600">
             Submit a story
           </Button>
           <Button variant="contained" color="secondary" className="bg-blue-600">
             Get the VoyceMe app
           </Button>
         </div> */}
       </div>
        </div>
    )
}

export default HomePage;