import { List } from 'immutable';
import { arrayMove } from 'react-sortable-hoc';

var escapeRegExp = /[-\\^$*+?.()|[\]{}]/g;
var escapeKeyword = function escapeKeyword(keyword) {
  return keyword.replace(escapeRegExp, '\\$&');
};

export default {
  getAvailableDataList: function getAvailableDataList(availableData, selectedData) {
    return availableData.map(function (item, ind) {
      var isLocked = item.isLocked,
          label = item.label,
          value = item.value;

      var isSelected = selectedData.findIndex(function (i) {
        return i.value === value;
      }) !== -1;
      var sort = ind + 1;
      return {
        isLocked: isLocked,
        isSelected: isSelected,
        label: label,
        sort: sort,
        value: value
      };
    });
  },

  getSelectedDataList: function getSelectedDataList(selectedData) {
    return selectedData.map(function (item, ind) {
      var isLocked = item.isLocked,
          label = item.label,
          value = item.value;

      var sort = ind + 1;
      return {
        isLocked: isLocked,
        label: label,
        sort: sort,
        value: value
      };
    });
  },

  changeDataSort: function changeDataSort(dataList, oldIndex, newIndex) {
    var data = dataList.toJS();
    var changeOverLockedItems = false;
    if (oldIndex + 1 < newIndex) {
      for (var i = oldIndex; i < newIndex; i += 1) {
        if (data[i] && data[i].isLocked) {
          changeOverLockedItems = true;
        }
      }
    }
    if (oldIndex > newIndex + 1) {
      for (var _i = oldIndex; _i > newIndex; _i -= 1) {
        if (data[_i] && data[_i].isLocked) {
          changeOverLockedItems = true;
        }
      }
    }
    var sortedData = [];
    if (changeOverLockedItems) {
      // Swap items if sorting is done over locked item to keep it in place
      var _i2 = void 0;
      _i2 = data.length;
      while (_i2 > 0) {
        _i2 -= 1;
        sortedData[_i2] = data[_i2];
      }
      sortedData[oldIndex] = data[newIndex];
      sortedData[newIndex] = data[oldIndex];
    } else {
      // Normal sorting move all other items up/down
      sortedData = arrayMove(data, oldIndex, newIndex);
    }
    return List(sortedData);
  },

  filterData: function filterData(data, keyword) {
    var filteredData = void 0;
    if (keyword !== '') {
      var regexp = new RegExp(escapeKeyword(keyword), 'i');
      filteredData = data.filter(function (i) {
        return regexp.test(i.label);
      });
    } else {
      filteredData = data;
    }
    return filteredData;
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhLnV0aWxzLmpzIl0sIm5hbWVzIjpbIkxpc3QiLCJhcnJheU1vdmUiLCJlc2NhcGVSZWdFeHAiLCJlc2NhcGVLZXl3b3JkIiwia2V5d29yZCIsInJlcGxhY2UiLCJnZXRBdmFpbGFibGVEYXRhTGlzdCIsImF2YWlsYWJsZURhdGEiLCJzZWxlY3RlZERhdGEiLCJtYXAiLCJpdGVtIiwiaW5kIiwiaXNMb2NrZWQiLCJsYWJlbCIsInZhbHVlIiwiaXNTZWxlY3RlZCIsImZpbmRJbmRleCIsImkiLCJzb3J0IiwiZ2V0U2VsZWN0ZWREYXRhTGlzdCIsImNoYW5nZURhdGFTb3J0IiwiZGF0YUxpc3QiLCJvbGRJbmRleCIsIm5ld0luZGV4IiwiZGF0YSIsInRvSlMiLCJjaGFuZ2VPdmVyTG9ja2VkSXRlbXMiLCJzb3J0ZWREYXRhIiwibGVuZ3RoIiwiZmlsdGVyRGF0YSIsImZpbHRlcmVkRGF0YSIsInJlZ2V4cCIsIlJlZ0V4cCIsImZpbHRlciIsInRlc3QiXSwibWFwcGluZ3MiOiJBQUFBLFNBQVNBLElBQVQsUUFBcUIsV0FBckI7QUFDQSxTQUFTQyxTQUFULFFBQTBCLG9CQUExQjs7QUFFQSxJQUFNQyxlQUFlLHNCQUFyQjtBQUNBLElBQU1DLGdCQUFnQixTQUFoQkEsYUFBZ0I7QUFBQSxTQUFXQyxRQUFRQyxPQUFSLENBQWdCSCxZQUFoQixFQUE4QixNQUE5QixDQUFYO0FBQUEsQ0FBdEI7O0FBRUEsZUFBZTtBQUNiSSx3QkFBc0IsOEJBQUNDLGFBQUQsRUFBZ0JDLFlBQWhCO0FBQUEsV0FDcEJELGNBQWNFLEdBQWQsQ0FBa0IsVUFBQ0MsSUFBRCxFQUFPQyxHQUFQLEVBQWU7QUFBQSxVQUN2QkMsUUFEdUIsR0FDSUYsSUFESixDQUN2QkUsUUFEdUI7QUFBQSxVQUNiQyxLQURhLEdBQ0lILElBREosQ0FDYkcsS0FEYTtBQUFBLFVBQ05DLEtBRE0sR0FDSUosSUFESixDQUNOSSxLQURNOztBQUUvQixVQUFNQyxhQUFhUCxhQUFhUSxTQUFiLENBQXVCO0FBQUEsZUFBS0MsRUFBRUgsS0FBRixLQUFZQSxLQUFqQjtBQUFBLE9BQXZCLE1BQW1ELENBQUMsQ0FBdkU7QUFDQSxVQUFNSSxPQUFPUCxNQUFNLENBQW5CO0FBQ0EsYUFBTztBQUNMQywwQkFESztBQUVMRyw4QkFGSztBQUdMRixvQkFISztBQUlMSyxrQkFKSztBQUtMSjtBQUxLLE9BQVA7QUFPRCxLQVhELENBRG9CO0FBQUEsR0FEVDs7QUFnQmJLLHVCQUFxQjtBQUFBLFdBQ25CWCxhQUFhQyxHQUFiLENBQWlCLFVBQUNDLElBQUQsRUFBT0MsR0FBUCxFQUFlO0FBQUEsVUFDdEJDLFFBRHNCLEdBQ0tGLElBREwsQ0FDdEJFLFFBRHNCO0FBQUEsVUFDWkMsS0FEWSxHQUNLSCxJQURMLENBQ1pHLEtBRFk7QUFBQSxVQUNMQyxLQURLLEdBQ0tKLElBREwsQ0FDTEksS0FESzs7QUFFOUIsVUFBTUksT0FBT1AsTUFBTSxDQUFuQjtBQUNBLGFBQU87QUFDTEMsMEJBREs7QUFFTEMsb0JBRks7QUFHTEssa0JBSEs7QUFJTEo7QUFKSyxPQUFQO0FBTUQsS0FURCxDQURtQjtBQUFBLEdBaEJSOztBQTZCYk0sa0JBQWdCLHdCQUFDQyxRQUFELEVBQVdDLFFBQVgsRUFBcUJDLFFBQXJCLEVBQWtDO0FBQ2hELFFBQU1DLE9BQU9ILFNBQVNJLElBQVQsRUFBYjtBQUNBLFFBQUlDLHdCQUF3QixLQUE1QjtBQUNBLFFBQUlKLFdBQVcsQ0FBWCxHQUFlQyxRQUFuQixFQUE2QjtBQUMzQixXQUFLLElBQUlOLElBQUlLLFFBQWIsRUFBdUJMLElBQUlNLFFBQTNCLEVBQXFDTixLQUFLLENBQTFDLEVBQTZDO0FBQzNDLFlBQUlPLEtBQUtQLENBQUwsS0FBV08sS0FBS1AsQ0FBTCxFQUFRTCxRQUF2QixFQUFpQztBQUMvQmMsa0NBQXdCLElBQXhCO0FBQ0Q7QUFDRjtBQUNGO0FBQ0QsUUFBSUosV0FBV0MsV0FBVyxDQUExQixFQUE2QjtBQUMzQixXQUFLLElBQUlOLEtBQUlLLFFBQWIsRUFBdUJMLEtBQUlNLFFBQTNCLEVBQXFDTixNQUFLLENBQTFDLEVBQTZDO0FBQzNDLFlBQUlPLEtBQUtQLEVBQUwsS0FBV08sS0FBS1AsRUFBTCxFQUFRTCxRQUF2QixFQUFpQztBQUMvQmMsa0NBQXdCLElBQXhCO0FBQ0Q7QUFDRjtBQUNGO0FBQ0QsUUFBSUMsYUFBYSxFQUFqQjtBQUNBLFFBQUlELHFCQUFKLEVBQTJCO0FBQ3pCO0FBQ0EsVUFBSVQsWUFBSjtBQUNBQSxZQUFJTyxLQUFLSSxNQUFUO0FBQ0EsYUFBT1gsTUFBSSxDQUFYLEVBQWM7QUFDWkEsZUFBSyxDQUFMO0FBQ0FVLG1CQUFXVixHQUFYLElBQWdCTyxLQUFLUCxHQUFMLENBQWhCO0FBQ0Q7QUFDRFUsaUJBQVdMLFFBQVgsSUFBdUJFLEtBQUtELFFBQUwsQ0FBdkI7QUFDQUksaUJBQVdKLFFBQVgsSUFBdUJDLEtBQUtGLFFBQUwsQ0FBdkI7QUFDRCxLQVZELE1BVU87QUFDTDtBQUNBSyxtQkFBYTFCLFVBQVV1QixJQUFWLEVBQWdCRixRQUFoQixFQUEwQkMsUUFBMUIsQ0FBYjtBQUNEO0FBQ0QsV0FBT3ZCLEtBQUsyQixVQUFMLENBQVA7QUFDRCxHQTlEWTs7QUFnRWJFLGNBQVksb0JBQUNMLElBQUQsRUFBT3BCLE9BQVAsRUFBbUI7QUFDN0IsUUFBSTBCLHFCQUFKO0FBQ0EsUUFBSTFCLFlBQVksRUFBaEIsRUFBb0I7QUFDbEIsVUFBTTJCLFNBQVMsSUFBSUMsTUFBSixDQUFXN0IsY0FBY0MsT0FBZCxDQUFYLEVBQW1DLEdBQW5DLENBQWY7QUFDQTBCLHFCQUFlTixLQUFLUyxNQUFMLENBQVk7QUFBQSxlQUFLRixPQUFPRyxJQUFQLENBQVlqQixFQUFFSixLQUFkLENBQUw7QUFBQSxPQUFaLENBQWY7QUFDRCxLQUhELE1BR087QUFDTGlCLHFCQUFlTixJQUFmO0FBQ0Q7QUFDRCxXQUFPTSxZQUFQO0FBQ0Q7QUF6RVksQ0FBZiIsImZpbGUiOiJkYXRhLnV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGlzdCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgeyBhcnJheU1vdmUgfSBmcm9tICdyZWFjdC1zb3J0YWJsZS1ob2MnO1xuXG5jb25zdCBlc2NhcGVSZWdFeHAgPSAvWy1cXFxcXiQqKz8uKCl8W1xcXXt9XS9nO1xuY29uc3QgZXNjYXBlS2V5d29yZCA9IGtleXdvcmQgPT4ga2V5d29yZC5yZXBsYWNlKGVzY2FwZVJlZ0V4cCwgJ1xcXFwkJicpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGdldEF2YWlsYWJsZURhdGFMaXN0OiAoYXZhaWxhYmxlRGF0YSwgc2VsZWN0ZWREYXRhKSA9PiAoXG4gICAgYXZhaWxhYmxlRGF0YS5tYXAoKGl0ZW0sIGluZCkgPT4ge1xuICAgICAgY29uc3QgeyBpc0xvY2tlZCwgbGFiZWwsIHZhbHVlIH0gPSBpdGVtO1xuICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IHNlbGVjdGVkRGF0YS5maW5kSW5kZXgoaSA9PiBpLnZhbHVlID09PSB2YWx1ZSkgIT09IC0xO1xuICAgICAgY29uc3Qgc29ydCA9IGluZCArIDE7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpc0xvY2tlZCxcbiAgICAgICAgaXNTZWxlY3RlZCxcbiAgICAgICAgbGFiZWwsXG4gICAgICAgIHNvcnQsXG4gICAgICAgIHZhbHVlLFxuICAgICAgfTtcbiAgICB9KVxuICApLFxuXG4gIGdldFNlbGVjdGVkRGF0YUxpc3Q6IHNlbGVjdGVkRGF0YSA9PiAoXG4gICAgc2VsZWN0ZWREYXRhLm1hcCgoaXRlbSwgaW5kKSA9PiB7XG4gICAgICBjb25zdCB7IGlzTG9ja2VkLCBsYWJlbCwgdmFsdWUgfSA9IGl0ZW07XG4gICAgICBjb25zdCBzb3J0ID0gaW5kICsgMTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlzTG9ja2VkLFxuICAgICAgICBsYWJlbCxcbiAgICAgICAgc29ydCxcbiAgICAgICAgdmFsdWUsXG4gICAgICB9O1xuICAgIH0pXG4gICksXG5cbiAgY2hhbmdlRGF0YVNvcnQ6IChkYXRhTGlzdCwgb2xkSW5kZXgsIG5ld0luZGV4KSA9PiB7XG4gICAgY29uc3QgZGF0YSA9IGRhdGFMaXN0LnRvSlMoKTtcbiAgICBsZXQgY2hhbmdlT3ZlckxvY2tlZEl0ZW1zID0gZmFsc2U7XG4gICAgaWYgKG9sZEluZGV4ICsgMSA8IG5ld0luZGV4KSB7XG4gICAgICBmb3IgKGxldCBpID0gb2xkSW5kZXg7IGkgPCBuZXdJbmRleDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChkYXRhW2ldICYmIGRhdGFbaV0uaXNMb2NrZWQpIHtcbiAgICAgICAgICBjaGFuZ2VPdmVyTG9ja2VkSXRlbXMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvbGRJbmRleCA+IG5ld0luZGV4ICsgMSkge1xuICAgICAgZm9yIChsZXQgaSA9IG9sZEluZGV4OyBpID4gbmV3SW5kZXg7IGkgLT0gMSkge1xuICAgICAgICBpZiAoZGF0YVtpXSAmJiBkYXRhW2ldLmlzTG9ja2VkKSB7XG4gICAgICAgICAgY2hhbmdlT3ZlckxvY2tlZEl0ZW1zID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBsZXQgc29ydGVkRGF0YSA9IFtdO1xuICAgIGlmIChjaGFuZ2VPdmVyTG9ja2VkSXRlbXMpIHtcbiAgICAgIC8vIFN3YXAgaXRlbXMgaWYgc29ydGluZyBpcyBkb25lIG92ZXIgbG9ja2VkIGl0ZW0gdG8ga2VlcCBpdCBpbiBwbGFjZVxuICAgICAgbGV0IGk7XG4gICAgICBpID0gZGF0YS5sZW5ndGg7XG4gICAgICB3aGlsZSAoaSA+IDApIHtcbiAgICAgICAgaSAtPSAxO1xuICAgICAgICBzb3J0ZWREYXRhW2ldID0gZGF0YVtpXTtcbiAgICAgIH1cbiAgICAgIHNvcnRlZERhdGFbb2xkSW5kZXhdID0gZGF0YVtuZXdJbmRleF07XG4gICAgICBzb3J0ZWREYXRhW25ld0luZGV4XSA9IGRhdGFbb2xkSW5kZXhdO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBOb3JtYWwgc29ydGluZyBtb3ZlIGFsbCBvdGhlciBpdGVtcyB1cC9kb3duXG4gICAgICBzb3J0ZWREYXRhID0gYXJyYXlNb3ZlKGRhdGEsIG9sZEluZGV4LCBuZXdJbmRleCk7XG4gICAgfVxuICAgIHJldHVybiBMaXN0KHNvcnRlZERhdGEpO1xuICB9LFxuXG4gIGZpbHRlckRhdGE6IChkYXRhLCBrZXl3b3JkKSA9PiB7XG4gICAgbGV0IGZpbHRlcmVkRGF0YTtcbiAgICBpZiAoa2V5d29yZCAhPT0gJycpIHtcbiAgICAgIGNvbnN0IHJlZ2V4cCA9IG5ldyBSZWdFeHAoZXNjYXBlS2V5d29yZChrZXl3b3JkKSwgJ2knKTtcbiAgICAgIGZpbHRlcmVkRGF0YSA9IGRhdGEuZmlsdGVyKGkgPT4gcmVnZXhwLnRlc3QoaS5sYWJlbCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWx0ZXJlZERhdGEgPSBkYXRhO1xuICAgIH1cbiAgICByZXR1cm4gZmlsdGVyZWREYXRhO1xuICB9LFxufTtcbiJdfQ==