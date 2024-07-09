const originalData = {
  datasets: [
    {
      label: "Пробег - Владелец 1",
      data: [
        { x: "2021-05-21", y: 11877 },
        { x: "2022-03-12", y: 56457 },
        { x: "2023-03-08", y: 125026 },
      ],
      borderColor: "rgba(69, 193, 255, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      tension: 0.4,
      fill: false,
      borderWidth: 5,
    },
    {
      label: "Пробег - Владелец 2",
      data: [
        { x: "2023-03-08", y: 125026 },
        { x: "2024-02-13", y: 150000 },
      ],
      borderColor: "rgba(255, 191, 66, 1)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      tension: 0.4,
      fill: false,
      borderWidth: 5,
    },
  ],
};

// Находим максимальное значение пробега из всех данных
let maxYValue = 0;
originalData.datasets.forEach(dataset => {
  dataset.data.forEach(point => {
    if (point.y > maxYValue) {
      maxYValue = point.y + 5000;
    }
  });
});

// Округляем максимальное значение вверх до ближайшего целого числа
maxYValue = Math.ceil(maxYValue / 1000) * 1000; // Округляем до ближайшего тысячного

const ctx = document.getElementById("myChart").getContext("2d");

const config = {
  type: "line",
  data: {
    datasets: originalData.datasets,
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Пробег, тыс. км",
        position: "top",
        align: "end",
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          parser: 'YYYY-MM-DD',
          unit: 'year',
          tooltipFormat: 'YYYY-MM-DD',
          displayFormats: {
            year: 'YYYY'
          }
        },
        grid: {
          display: false, // Убираем сетку у оси X
        },
        title: {
          display: false,
        },
        ticks: {
          source: 'data',
          autoSkip: true,
          maxTicksLimit: 6,
          font: {
            size: 14,
            weight: "600",
          },
          callback: function(value, index, values) {
            return moment(value).format('YYYY');
          }
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
           borderDash: [8, 4],
          drawBorder: true,
        },
        position: "right",
        ticks: {
          stepSize: 50000, // Шаг теперь в 50 тыс., чтобы показать целые числа
          font: {
            size: 14,
            weight: "600",
            lineHeight: 1.71,
            letterSpacing: '0.1em',
            transform: 'uppercase',
            textAlign: 'right',
          },
          padding: 10, // Добавляем отступы, чтобы метки не обрезались
        
          callback: function(value) {
            return (value / 1000).toFixed(0); // Округляем до целого числа
          },
        
        },
        min: 0,
        max: maxYValue, // Динамически установленное максимальное значение
      },
    },
  },
};

const mileageChart = new Chart(ctx, config);

// Устанавливаем ширину элемента canvas в зависимости от ширины окна
/* const canvasElement = document.getElementById('myChart');
canvasElement.style.width = '100%'; */