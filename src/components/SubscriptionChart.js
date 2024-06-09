
import React from 'react';
import { Pie,Bar } from 'react-chartjs-2';
import '../styles/Chart.css'
import 'chart.js/auto'; 

const SubscriptionChart = ({ subscriptions }) => {
    
    const planCount = subscriptions.reduce((acc, subscription) => {
        const plan = subscription.package;
        acc[plan] = (acc[plan] || 0) + 1;
        return acc;
    }, {});

    
    const totalCount = Object.values(planCount).reduce((total, count) => total + count, 0);

   
    const percentages = Object.keys(planCount).reduce((acc, plan) => {
        acc[plan] = (((planCount[plan] || 0) / totalCount) * 100 );
        return acc;
    }, {});

  
    const data = {
        labels: Object.keys(planCount) ,
        datasets: [
            {
                label: 'Subscription Plans in Count',
                data: Object.values(planCount),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#FF6384',
                ],

            },
        ],
    };
   
    const pieData = {
        labels: Object.keys(percentages) ,
        datasets: [
            {
                label: 'Subscription Plans in %',
                data: Object.values(percentages),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#FF6384',
                ],
            },
        ],
    };


    

    return (
        <>
         {/* <h2>Subscription Plans Distribution </h2> */}
        {/* <div className='chart-layout'> */}
          
            <div>
            <Bar data={data} />
            </div>
            <div>
            <Pie data={pieData}/>

            </div>
     
        {/* </div> */}
        </>
    );
};

export default SubscriptionChart;
