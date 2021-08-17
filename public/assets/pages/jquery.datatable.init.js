/**
 * Theme: Frogetor - Responsive Bootstrap 4 Admin Dashboard
 * Author: Mannatthemes
 * Datatables Js
 */

 
$(document).ready(function() {
  $('#datatable').DataTable();

  $(document).ready(function() {
      $('#datatable2').DataTable();  
  } );

  //Buttons examples
  var table = $('#datatable-buttons').DataTable({
      lengthChange: true,
      "lengthMenu": [[25,10,50, -1], [25,10,50, "All"]],
    //   "order": [[ 1, "asc" ]],
      scrollX:        true,
      autoWidth: false,
      buttons: [{
        extend: 'excel',
        title: 'SwosthReports',
        exportOptions: {
            columns: "th:not(.notexport)"
        }
    }]
     
  });
    // $('#active_patient_list tfoot th').each(function() {
    //     var title = $(this).text();
    //     $(this).html('<input type="text" placeholder="Search ' + title + '" />');
    // });
 
   
  //Kaushik
 //Active Patient List




 var table1= $('#active_patient_list').DataTable({
    lengthChange: true,
    "lengthMenu": [[25,10,50, -1], [25,10,50, "All"]],
    "order": [[ 6, "desc" ]],
    scrollX:        true,
    autoWidth: false,
    buttons: [{
      extend: 'excel',
      title: 'SwosthReports',
      exportOptions: {
          columns: "th:not(.notexport)"
      }
  }],
});

 //Incoming Patient List
 var table2= $('#incoming_patients_list').DataTable({
    lengthChange: true,
    "lengthMenu": [[25,10,50, -1], [25,10,50, "All"]],
    "order": [[ 6, "desc" ]],
    scrollX:        true,
    autoWidth: false,
    buttons: [{
      extend: 'excel',
      title: 'SwosthReports',
      exportOptions: {
          columns: "th:not(.notexport)"
      }
  }]
   
});
//DO Patient List
 var table3= $('#do_patient_list').DataTable({
    lengthChange: true,
    "lengthMenu": [[25,10,50, -1], [25,10,50, "All"]],
    "order": [[ 17, "desc" ]],
    scrollX:        true,
    autoWidth: false,
    buttons: [{
      extend: 'excel',
      title: 'SwosthReports',
      exportOptions: {
          columns: "th:not(.notexport)"
      }
  }]
   
});

//accepted_referral
var table4= $('#accepted_referral').DataTable({
    lengthChange: true,
    "lengthMenu": [[25,10,50, -1], [25,10,50, "All"]],
    "order": [[ 0, "desc" ]],
    scrollX:        true,
    autoWidth: false,
    buttons: [{
      extend: 'excel',
      title: 'SwosthReports',
      exportOptions: {
          columns: "th:not(.notexport)"
      }
  }]
   
});

//pending_hospital_referrals
var table5= $('#pending_hospital_referrals').DataTable({
    lengthChange: true,
    "lengthMenu": [[25,10,50, -1], [25,10,50, "All"]],
    "order": [[ 0, "desc" ]],
    scrollX:        true,
    autoWidth: false,
    buttons: [{
      extend: 'excel',
      title: 'SwosthReports',
      exportOptions: {
          columns: "th:not(.notexport)"
      }
  }]
   
});

//pending_rrt_referrals
var table6= $('#pending_rrt_referrals').DataTable({
    lengthChange: true,
    "lengthMenu": [[25,10,50, -1], [25,10,50, "All"]],
    "order": [[ 0, "desc" ]],
    scrollX:        true,
    autoWidth: false,
    buttons: [{
      extend: 'excel',
      title: 'SwosthReports',
      exportOptions: {
          columns: "th:not(.notexport)"
      }
  }]
   
});

//out_accepted_referral
var table6= $('#out_accepted_referral').DataTable({
    lengthChange: true,
    "lengthMenu": [[25,10,50, -1], [25,10,50, "All"]],
    "order": [[ 0, "desc" ]],
    scrollX:        true,
    autoWidth: false,
    buttons: [{
      extend: 'excel',
      title: 'SwosthReports',
      exportOptions: {
          columns: "th:not(.notexport)"
      }
  }]
   
});

//out_pending_referral
var table7= $('#out_pending_referral').DataTable({
    lengthChange: true,
    "lengthMenu": [[25,10,50, -1], [25,10,50, "All"]],
    "order": [[ 0, "desc" ]],
    scrollX:        true,
    autoWidth: false,
    buttons: [{
      extend: 'excel',
      title: 'SwosthReports',
      exportOptions: {
          columns: "th:not(.notexport)"
      }
  }]
   
});

//cc_incoming_pending_rrt
var table8= $('#cc_incoming_pending_rrt').DataTable({
    lengthChange: true,
    "lengthMenu": [[25,10,50, -1], [25,10,50, "All"]],
    "order": [[ 0, "desc" ]],
    scrollX:        true,
    autoWidth: false,
    buttons: [{
      extend: 'excel',
      title: 'SwosthReports',
      exportOptions: {
          columns: "th:not(.notexport)"
      }
  }]
   
});

//cc_incoming_accepted_referrals
var table9= $('#cc_incoming_accepted_referrals').DataTable({
    lengthChange: true,
    "lengthMenu": [[25,10,50, -1], [25,10,50, "All"]],
    "order": [[ 0, "desc" ]],
    scrollX:        true,
    autoWidth: false,
    buttons: [{
      extend: 'excel',
      title: 'SwosthReports',
      exportOptions: {
          columns: "th:not(.notexport)"
      }
  }]
   
});


//co_previous_referrals
var table9= $('#co_previous_referrals').DataTable({
    lengthChange: true,
    "lengthMenu": [[25,10,50, -1], [25,10,50, "All"]],
    "order": [[ 0, "desc" ]],
    scrollX:        true,
    autoWidth: false,
    buttons: [{
      extend: 'excel',
      title: 'SwosthReports',
      exportOptions: {
          columns: "th:not(.notexport)"
      }
  }]
   
});

//co_outgoing_pending_referral
var table10= $('#co_outgoing_pending_referral').DataTable({
    lengthChange: true,
    "lengthMenu": [[25,10,50, -1], [25,10,50, "All"]],
    "order": [[ 0, "desc" ]],
    scrollX:        true,
    autoWidth: false,
    buttons: [{
      extend: 'excel',
      title: 'SwosthReports',
      exportOptions: {
          columns: "th:not(.notexport)"
      }
  }]
   
});

//outgoing_previous_referrals
var table11= $('#outgoing_previous_referrals').DataTable({
    lengthChange: true,
    "lengthMenu": [[25,10,50, -1], [25,10,50, "All"]],
    "order": [[ 0, "desc" ]],
    scrollX:        true,
    autoWidth: false,
    buttons: [{
      extend: 'excel',
      title: 'SwosthReports',
      exportOptions: {
          columns: "th:not(.notexport)"
      }
  }]
   
});

//co_centre_management
var table12= $('#co_centre_list').DataTable({
    lengthChange: true,
    "lengthMenu": [[25,10,50, -1], [25,10,50, "All"]],
    "order": [[ 11, "asc" ]],
    scrollX:        true,
    autoWidth: false,
    buttons: [{
      extend: 'excel',
      title: 'SwosthReports',
      exportOptions: {
          columns: "th:not(.notexport)"
      }
  }]
   
});

//co_user_list
var table13= $('#co_user_list').DataTable({
    lengthChange: true,
    "lengthMenu": [[25,10,50, -1], [25,10,50, "All"]],
    "order": [[ 7, "asc" ]],
    scrollX:        true,
    autoWidth: false,
    buttons: [{
      extend: 'excel',
      title: 'SwosthReports',
      exportOptions: {
          columns: "th:not(.notexport)"
      }
  }]
   
});

//co_covid_cell_user
var table14= $('#co_covid_cell_user').DataTable({
    lengthChange: true,
    "lengthMenu": [[25,10,50, -1], [25,10,50, "All"]],
    "order": [[ 0, "asc" ]],
    scrollX:        true,
    autoWidth: false,
    buttons: [{
      extend: 'excel',
      title: 'SwosthReports',
      exportOptions: {
          columns: "th:not(.notexport)"
      }
  }]
   
});



//Kaushik
//Discharge Patient List
var table = $('#discharge_patient_list').DataTable({
    lengthChange: true,
    "lengthMenu": [[25,10,50, -1], [25,10,50, "All"]],
    "order": [[ 3, "desc" ]],
    // "ordering": false,
    scrollX:        true,
    autoWidth: false,
    buttons: [{
      extend: 'excel',
      title: 'SwosthReports',
      exportOptions: {
          columns: "th:not(.notexport)"
      }
  }]
   
});

  $(document).ready(function() {
    var table = $('#example-table1').removeAttr('width').DataTable( {
        scrollY:        "600px",
        scrollX:        true,
        scrollCollapse: true,
        paging:         false,
        columnDefs: [
            { width: 250, targets: 0 }
        ],
        fixedColumns: true
    } );
} );

  table.buttons().container()
      .appendTo('#datatable-buttons_wrapper .col-md-6:eq(0)');


     

      $("#datatable-buttons tfoot th").each( function ( i ) {
          
        if ($(this).text() !== '') {
            var isStatusColumn = (($(this).text() == 'Status') ? true : false);
            var select = $('<select><option value=""></option></select>')
                .appendTo( $(this).empty() )
                .on( 'change', function () {
                    var val = $(this).val();
                    
                    table.column( i )
                        .search( val ? '^'+$(this).val()+'$' : val, true, false )
                        .draw();
                } );
             
            // Get the Status values a specific way since the status is a anchor/image
            if (isStatusColumn) {
                var statusItems = [];
                
                /* ### IS THERE A BETTER/SIMPLER WAY TO GET A UNIQUE ARRAY OF <TD> data-filter ATTRIBUTES? ### */
                table.column( i ).nodes().to$().each( function(d, j){
                    var thisStatus = $(j).attr("data-filter");
                    if($.inArray(thisStatus, statusItems) === -1) statusItems.push(thisStatus);
                } );
                
                statusItems.sort();
                                
                $.each( statusItems, function(i, item){
                    select.append( '<option value="'+item+'">'+item+'</option>' );
                });

            }
            // All other non-Status columns (like the example)
            else {
                table.column( i ).data().unique().sort().each( function ( d, j ) {  
                    select.append( '<option value="'+d+'">'+d+'</option>' );
                } );	
            }
            
        }
    } );
  
} );