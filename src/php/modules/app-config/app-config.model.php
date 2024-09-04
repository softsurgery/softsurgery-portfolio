<?php
class AppConfigModel
{
    private $key;
    private $value;

    public function __construct($key, $value)
    {
        $this->key = $key;
        $this->value = $value;
    }

    // Getters
    public function getKey()
    {
        return $this->key;
    }

    public function getValue()
    {
        return $this->value;
    }

    // Setters
    public function setKey($key)
    {
        $this->key = $key;
    }

    public function setValue($value)
    {
        $this->value = $value;
    }
}

?>