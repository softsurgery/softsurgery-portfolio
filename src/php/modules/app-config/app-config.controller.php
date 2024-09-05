<?php

require_once __DIR__ . "/app-config.model.php";
require_once __DIR__ . "/../../Database.php";

class AppConfigController
{
    private $pdo;

    public function __construct()
    {
        $this->pdo = Database::getInstance()->getConnection();
    }

    // Create a new config
    public function createConfig(AppConfigModel $config)
    {
        $sql = "INSERT INTO `app-config` (`key`, `value`) VALUES (:key, :value)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindParam(':key', $config->getKey());
        $stmt->bindParam(':value', $config->getValue());
        $stmt->execute();
    }

    // Read config by key
    public function getConfig($key)
    {
        $sql = "SELECT * FROM `app-config` WHERE `key` = :key";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindParam(':key', $key);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            return new AppConfigModel($result['key'], $result['value']);
        }
        return null;
    }

    // Read config by array of keys
    public function getConfigs(array $keys)
    {
        // Generate placeholders for each key
        $placeholders = rtrim(str_repeat('?,', count($keys)), ',');

        $sql = "SELECT * FROM `app-config` WHERE `key` IN ($placeholders)";
        $stmt = $this->pdo->prepare($sql);

        // Execute the statement with the array of keys
        $stmt->execute($keys);
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $configs = [];
        if ($results) {
            foreach ($results as $result) {
                $configs[] = new AppConfigModel($result['key'], $result['value']);
            }
        }
        return $configs;
    }

    // Update config value by key
    public function updateConfig(AppConfigModel $config)
    {
        $sql = "UPDATE `app-config` SET `value` = :value WHERE `key` = :key";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindParam(':key', $config->getKey());
        $stmt->bindParam(':value', $config->getValue());
        $stmt->execute();
    }

    // Delete config by key
    public function deleteConfig($key)
    {
        $sql = "DELETE FROM `app-config` WHERE `key` = :key";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindParam(':key', $key);
        $stmt->execute();
    }
}
