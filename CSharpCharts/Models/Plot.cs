using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CSharpCharts.Models
{
    public class Plot
    {
        public string label { get; set; }
        public IEnumerable<List<int>> data { get; set; }
        public IEnumerable<Point> ToPoints()
        {
            return data.Select(point => new Point(point[0], point[1]));
        }
    }
    public struct Point
    {
        private int _x;
        private int _y;
        public Point(int x, int y)
        {
            _x = x;
            _y = y;
        }
        public int x { get => _x; set => _x = value; }
        public int y { get => _y; set => _y = value; }
    }
}
