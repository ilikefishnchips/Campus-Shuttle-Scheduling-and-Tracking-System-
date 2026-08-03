# Campus Shuttle Scheduling and Tracking System

A web-based campus shuttle system for MMU, built with PHP and MySQL. It lets students
book seats on scheduled shuttle trips, drivers run and update their assigned trips,
transport coordinators build the schedule, and administrators manage users, vehicles
and reports.

## Tech stack

- **Backend:** PHP (procedural, `mysqli`)
- **Database:** MySQL / MariaDB (`campus_shuttle_test`)
- **Frontend:** Plain HTML, CSS and vanilla JavaScript (no framework, no build step)
- **Server:** Apache via XAMPP / WAMP / LAMP

## Roles and features

### Student
- Log in with a Student ID (`student_login.php`)
- Dashboard with upcoming bookings (`student/dashboard.php`)
- Book a shuttle: choose route → time → seat → confirm
  (`student/book_shuttle.php`, `select_time.php`, `select_seat.php`, `confirm_booking.php`)
- View and cancel bookings (`student/my_bookings.php`, `cancel_booking.php`)
- Notifications and incident reporting (`student/notifications.php`, `report_incident.php`)

### Driver
- Log in at `driver/driver_login.php`
- Dashboard listing assigned schedules (`driver/driver_dashboard.php`)
- Start a route and update trip status (`driver_start_route.php`, `driver_update_status.php`)
- View the passenger list for a trip (`driver_view_passengers.php`)
- Report incidents and read notifications (`driver_report_incident.php`, `driver_notification.php`)

### Transport Coordinator
- Log in at `coordinator_login.php`
- Control panel with notifications summary (`coordinator/controlPanel.php`)
- Create and cancel schedules (`createSchedule.php`, `cancelSchedule.php`)
- Assign drivers to schedules (`assignDriver.php`)
- Manage routes and stops (`manageRoutePage.php`, `getRouteStops.php`)
- Reports and notification handling (`reports.php`, `notification.php`)

### Administrator
- Log in at `campus-shuttle-admin-html/adminLoginPage.php`
- Dashboard with system statistics (`adminDashboard.php`)
- Manage users, roles and vehicles (`manageUserPage.php`, `manageRolesPage.php`, `manageVehiclePage.php`)
- Review incident reports (`getIncidentDetails.php`, `processIncidentAction.php`)
- System reports (`systemReport.php`)

### Public
- Landing page and role selection (`index.php`, `role_selection.php`, `staff_selection.php`)
- Live shuttle tracking, no login required (`track_shuttle.php`, `track_route.php`)

## Project structure

```
.
├── index.php                     Landing page
├── role_selection.php            Student vs. Staff entry point
├── staff_selection.php           Driver / Coordinator / Admin entry point
├── login_process.php             Shared login handler (all roles)
├── student_login.php             Student login form
├── coordinator_login.php         Coordinator login form
├── logout.php                    Destroys the session
├── track_shuttle.php             Public live tracking
├── track_route.php               Public route detail view
├── config/db.php                 mysqli connection ($conn) used by the driver module
├── includes/
│   ├── config.php                DB constants + session start + $conn (main connection)
│   └── auth.php                  isLoggedIn(), checkRole(), redirectBasedOnRole()
├── student/                      Student pages and booking flow
├── driver/                       Driver login, dashboard and trip actions
├── coordinator/                  Scheduling, routes, driver assignment, reports
├── campus-shuttle-admin-html/    Admin login, dashboard and management pages
├── admin/test.php                Scratch/test page
├── css/, index.css               Stylesheets
├── java/                         JavaScript files (script.js, data.js, admin/script.js)
└── assets/                       Logo and background images
```

## Database

The application expects a MySQL database named `campus_shuttle_test`. Main tables
referenced by the code:

| Table | Purpose |
|---|---|
| `user` | Accounts (`User_ID`, `Username`, `Password`) |
| `roles`, `user_roles` | Role definitions and user↔role mapping |
| `student_profile`, `driver_profile` | Role-specific profile data |
| `route`, `route_stops`, `route_time` | Routes, their stops and timings |
| `vehicle` | Shuttle vehicles (`Plate_number`, capacity) |
| `shuttle_schedule` | Scheduled trips (route, vehicle, driver, departure, status) |
| `seat_reservation` | Student seat bookings |
| `shuttle_status_update` | Live trip status updates from drivers |
| `notifications` | Per-user notifications |
| `incident_reports`, `deleted_incidents_log` | Incident reporting and audit trail |
| `audit_logs`, `system_settings` | Admin logging and configuration |

Role names used in code and stored in `roles.Role_name` are exactly:
`Student`, `Driver`, `Transport Coordinator`, `Admin`.

> **Note:** no `.sql` dump is committed to this repository. You need an existing
> `campus_shuttle_test` database (or your own schema matching the tables above) for
> the application to run.

## Setup

1. Install XAMPP (or any Apache + PHP + MySQL stack) and start **Apache** and **MySQL**.
2. Copy this project folder into your web root, e.g. `C:\xampp\htdocs\campus-shuttle`.
3. Create the database in phpMyAdmin:
   ```sql
   CREATE DATABASE campus_shuttle_test;
   ```
   Then import the schema/data dump for the project.
4. Check the credentials in `includes/config.php` and `config/db.php` — both default to:
   - host `localhost`, user `root`, empty password, database `campus_shuttle_test`
5. Open `http://localhost/campus-shuttle/index.php` in your browser.

## Logging in

Passwords are stored as PHP `password_hash()` values and checked with `password_verify()`.
Seeded demo accounts in the development database use the password `password123`.
Log in by picking a role from the landing page, then entering the username and password
for an account that has that role in `user_roles`.

## Known rough edges

- `login_process.php` and `includes/auth.php` redirect drivers to `driver/dashboard.php`,
  but the actual file is `driver/driver_dashboard.php`.
- `driver/driver_dashboard.php` reads `$_SESSION['driver_id']` while the rest of the
  system uses `$_SESSION['user_id']` and `$_SESSION['role']`.
- `redirectToLogin()` in `login_process.php` points drivers at `driver_login.php` in the
  project root; the file now lives in `driver/`.
- `debug_login.php` and `admin/test.php` are development helpers and should not be
  deployed.
