import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

const HalfDonutChart = () => {
  const { allTickets } = useSelector((state) => state.ticket);

  console.log({ allTickets });

  const openTickets = allTickets.filter((item) => item.status === "Open");
  const openTicketsCount = openTickets.length;

  const inProgressTickets = allTickets.filter(
    (item) => item.status === "InProgress"
  );
  const inProgressTicketsCount = inProgressTickets.length;

  const closedTickets = allTickets.filter((item) => item.status === "Closed");
  const closedTicketsCount = closedTickets.length;

  const chartOptions = {
    chart: {
      type: "donut",
      height: 100,
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        offsetY: 15,
        donut: {
          size: "75%",
        },
      },
    },
    labels: ["Open", "In Progress", "Close"],
    series: [openTicketsCount, inProgressTicketsCount, closedTicketsCount],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className="half-donut-chart relative md:border-b-2 mx-1 md:border-b-neutral-100 flex items-center justify-center">
      <ReactApexChart
        options={chartOptions}
        series={chartOptions.series}
        type="donut"
      />
      <div className="absolute -translate-y-2/4 -translate-x-1/2 top-[60%] left-1/2 text-center">
        <span className="caption text-neutral-300">Opened</span>
        <h3>{openTicketsCount}</h3>
        <p className="caption text-black">out of {allTickets.length}</p>
      </div>
    </div>
  );
};

export default HalfDonutChart;
