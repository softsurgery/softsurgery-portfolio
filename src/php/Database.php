<?php

class Database
{
    private static $instance = null;
    private $pdo;
    private $HOST = "{{DB_HOST}}";
    private $USERNAME = "{{DB_USERNAME}}";
    private $PASSWORD = "{{DB_PASSWORD}}";
    private $DB_NAME = "{{DB_NAME}}";

    private function __construct()
    {
        // Replace placeholders with environment variables
        $this->HOST = getenv('DB_HOST') ?: $this->HOST;
        $this->USERNAME = getenv('DB_USERNAME') ?: $this->USERNAME;
        $this->PASSWORD = getenv('DB_PASSWORD') ?: $this->PASSWORD;
        $this->DB_NAME = getenv('DB_NAME') ?: $this->DB_NAME;

        try {
            $this->pdo = new PDO("mysql:host=$this->HOST;dbname=$this->DB_NAME", $this->USERNAME, $this->PASSWORD);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Database connection failed: " . $e->getMessage());
        }
    }

    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    public function getConnection()
    {
        return $this->pdo;
    }
}
