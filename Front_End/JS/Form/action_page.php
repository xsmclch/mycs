<!DOCTYPE html>
<html>

<body>

    <h1>Form Submission Result</h1>

    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $fname = $_POST['fname'];
        $lname = $_POST['lname'];
        echo "<p>Submitted using POST method:</p>";
    } else {
        $fname = $_GET['fname'];
        $lname = $_GET['lname'];
        echo "<p>Submitted using GET method:</p>";
    }
    echo "<p>First name: " . htmlspecialchars($fname) . "</p>";
    echo "<p>Last name: " . htmlspecialchars($lname) . "</p>";
    ?>

</body>

</html>
