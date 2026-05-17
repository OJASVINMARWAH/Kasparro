import React from 'react';

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    AreaChart,
    Area,
    CartesianGrid
} from 'recharts';

const AnalyticsPanel = ({ cases }) => {

    // WORKFLOW ANALYTICS

    const workflowData = [

        {
            name: 'Approved',

            value:
                cases.filter(
                    c =>
                        c.workflowStatus ===
                        'APPROVED'
                ).length
        },

        {
            name: 'Escalated',

            value:
                cases.filter(
                    c =>
                        c.workflowStatus ===
                        'ESCALATED'
                ).length
        },

        {
            name: 'Rejected',

            value:
                cases.filter(
                    c =>
                        c.workflowStatus ===
                        'REJECTED'
                ).length
        },

        {
            name: 'Pending',

            value:
                cases.filter(
                    c =>
                        c.workflowStatus !==
                        'APPROVED' &&
                        c.workflowStatus !==
                        'ESCALATED' &&
                        c.workflowStatus !==
                        'REJECTED'
                ).length
        },
    ];

    // REGION ANALYTICS

    const regionMap = {};

    cases.forEach(c => {

        const region =
            c.analytics?.region ||
            'Unknown';

        regionMap[region] =
            (regionMap[region] || 0) + 1;
    });

    const regionData =
        Object.entries(regionMap).map(

            ([region, claims]) => ({

                region,

                claims
            })
        );

    // WEEKLY TREND ANALYTICS

    const trendMap = {};

    cases.forEach(c => {

        const date =
            new Date(
                c.createdAt
            );

        const day =
            date.toLocaleDateString(
                'en-US',
                {
                    weekday: 'short'
                }
            );

        trendMap[day] =
            (trendMap[day] || 0) + 1;
    });

    const trendData =
        Object.entries(trendMap).map(

            ([day, claims]) => ({

                day,

                claims
            })
        );

    return (

        <div className="analytics-grid">

            {/* PIE CHART */}

            <div className="analytics-card">

                <h3>
                    Workflow Outcomes
                </h3>

                <ResponsiveContainer
                    width="100%"
                    height={260}
                >

                    <PieChart>

                        <Pie
                            data={workflowData}
                            dataKey="value"
                            outerRadius={90}
                            innerRadius={55}
                            paddingAngle={5}
                        >

                            <Cell fill="#E65100" />
                            <Cell fill="#6D4C41" />
                            <Cell fill="#8E24AA" />
                            <Cell fill="#FFB300" />

                        </Pie>

                        <Tooltip />

                    </PieChart>

                </ResponsiveContainer>

            </div>

            {/* REGION BAR CHART */}

            <div className="analytics-card">

                <h3>
                    Claims by Region
                </h3>

                <ResponsiveContainer
                    width="100%"
                    height={260}
                >

                    <BarChart
                        data={regionData}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            dataKey="region"
                        />

                        <Tooltip />

                        <Bar
                            dataKey="claims"
                            fill="#E65100"
                            radius={[8, 8, 0, 0]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

            {/* AREA CHART */}

            <div className="analytics-card full-width">

                <h3>
                    Weekly Claim Trends
                </h3>

                <ResponsiveContainer
                    width="100%"
                    height={260}
                >

                    <AreaChart
                        data={trendData}
                    >

                        <defs>

                            <linearGradient
                                id="colorClaims"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >

                                <stop
                                    offset="5%"
                                    stopColor="#E65100"
                                    stopOpacity={0.8}
                                />

                                <stop
                                    offset="95%"
                                    stopColor="#E65100"
                                    stopOpacity={0}
                                />

                            </linearGradient>

                        </defs>

                        <XAxis
                            dataKey="day"
                        />

                        <Tooltip />

                        <Area
                            type="monotone"
                            dataKey="claims"
                            stroke="#E65100"
                            fillOpacity={1}
                            fill="url(#colorClaims)"
                        />

                    </AreaChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
};

export default AnalyticsPanel;