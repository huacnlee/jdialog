# jDialog 

jDialog is a popup window plugin for jQuery, It simple to use.

## Example

  <script type="text/javascript">
    function showChangeLocal(el){
      $(el).jDialog({
        title : "Dialog title",
        content : "<p>This is dialog HTML content</p>",
        width : 400
      });
      return false;
    }
  </script>
  <a href="#" onclick="return showChangeLocal(this);">change local</a>
  