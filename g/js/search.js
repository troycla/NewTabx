    function searchPage() {
      var input, filter, content, items, i;
      input = document.getElementById('searchBar');
      filter = input.value.toLowerCase();
      content = document.getElementById('content');
      items = content.getElementsByClassName('content-item');

      for (i = 0; i < items.length; i++) {
        var text = items[i].textContent.toLowerCase();
        var category = items[i].getAttribute('data-category').toLowerCase();
        if (text.indexOf(filter) > -1 || category.indexOf(filter) > -1) {
          items[i].style.display = '';
        } else {
          items[i].style.display = 'none';
        }
      }
    }
